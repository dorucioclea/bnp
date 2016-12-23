'use strict';

// See why and how /etc/hosts is populated with "dockerhost" in "startup-script".
const consul = require('consul')({ host: 'dockerhost' });
const EventEmitter = require('events');

function getServicesNames(tag) {
  // The function returns a promise of an array of names of all services with tag (string),
  // or an array of names of all services if tag is not specified.
  return new Promise((resolve, reject) => consul.catalog.service.list((err, allServices) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(Object.keys(allServices).reduce((rez, serviceName) => {
      let serviceTags = allServices[serviceName];

      if (!tag || serviceTags.indexOf(tag) !== -1) {
        rez.push(serviceName);
      }

      return rez;
    }, []));

    return;
  }));
}

function getServiceDetails(serviceName) {
  // The function returns a promise of an object describing a service with specified name. Object format:
  // {
  //   name: "<service name>",
  //   ip: "<service address>",
  //   port: "<service port>",
  //   tags: ["service tag", ...]
  // }
  return new Promise((resolve, reject) => consul.catalog.service.nodes(serviceName, (err, nodesInfo) => {
    if (err) {
      reject(err);
      return;
    }

    let serviceInfo = nodesInfo[0];

    resolve({
      name: serviceInfo.ServiceName,
      ip: serviceInfo.ServiceAddress,
      port: serviceInfo.ServicePort,
      tags: serviceInfo.ServiceTags
    });

    return;
  }));
}

function getServicesDetails() {
  // The function accepts two optional arguments:
  // 1. [optional, array] names of services. All services if not specified.
  // 2. [optional, string] tag. Services are not filtered by tag if not specified.
  //
  // The function returns a promise of array of objects. Each object contains details about
  // requested services in the following format:
  // {
  //   name: "<service name>",
  //   ip: "<service address>",
  //   port: "<service port>",
  //   tags: ["service tag", ...]
  // }

  let servicesNames;
  let tag;

  switch (arguments.length) {
    case 0:
      break;
    case 1:
      if (typeof arguments[0] === 'string') {
        tag = arguments[0];
      } else {
        servicesNames = arguments[0];
      }
      break;
    case 2:
      servicesNames = arguments[0];
      tag = arguments[1];
      break;
    default:
      throw new Error('Unknown arguments');
  }

  return (servicesNames ? Promise.resolve(servicesNames) : getServicesNames()).
    then(servicesNames => Promise.all(servicesNames.map(serviceName => getServiceDetails(serviceName)))).
    then(servicesDetails => servicesDetails.filter(serviceDetails => !tag || serviceDetails.tags.indexOf(tag) !== -1))
}

function getHostnamePort(hostname) {
  const dns = require('dns');

  return Promise.all([
    new Promise((resolve, reject) => dns.lookup(hostname, function(err, ip) {
      if (err) {
        reject(err);
      } else {
        resolve(ip);
      }
    })),
    getServicesDetails()
  ]).
    then(([ip, allServices]) => {
      let port;

      for (let curService of allServices) {
        if (curService.ip === ip) {
          port = curService.port;
          break;
        }
      }

      return port;
    });
}

class ConsulEmitter extends EventEmitter {
  integrationServices = {};

  constructor(consul) {
    super();

    let servicesListWatch = consul.watch({
      method: consul.catalog.service.list
    });

    servicesListWatch.on('error', err => {
      this.emit('service', 'error', err);
    });

    servicesListWatch.on('change', (allServices, res) => {  // NOTE: first event happens immediatelly after watch call.
      let updatedServices = Object.keys(allServices).reduce((hash, serviceName) => {
        if (allServices[serviceName].indexOf('external') === -1) {
          return hash;
        }

        if (!this.integrationServices[serviceName]) {
          // New service has been registered in Consul.
          this._processServiceRegistration(serviceName);
        }

        return {
          ...hash,
          serviceName: true
        };
      }, {});

      Object.keys(this.integrationServices).forEach(serviceName => {
        if (!updatedServices[serviceName]) {
          // The service has been unregistered in Consul.
          this.integrationServices[serviceName].watch.end();
          delete this.integrationServices[serviceName];

          this.emit('service', 'delete', {
            name: serviceName
          });
        }
      });
    });

    this.once('newListener', (event, listener) => {
      if (event === 'service') {
        // Inform new listener about all available services.
        Object.keys(this.integrationServices).forEach(serviceName => {
          let details = {
            ...this.integrationServices[serviceName],
            name: serviceName
          };

          delete details.watch;
          listener('add', details);
        });
      }
    });
  }

  _processServiceRegistration(serviceName) {
    let serviceWatch = consul.watch({
      method: consul.catalog.service.nodes,
      options: {
        service: serviceName
      }
    });

    serviceWatch.on('error', err => {
      this.emit('service', 'error', err);
    });

    serviceWatch.on('change', (nodesInfo, res) => {  // NOTE: first event happens immediatelly after watch call.
      let integrationService = this.integrationServices[serviceName];

      if (nodesInfo.length === 0) {
        // The service has been unregistered in Consul.
        if (integrationService) {
          integrationService.watch.end();
          delete this.integrationServices[serviceName];

          this.emit('service', 'delete', {
            name: serviceName
          });
        }

        return;
      }

      let serviceInfo = nodesInfo[0];
      let ip = serviceInfo.ServiceAddress;
      let port = serviceInfo.ServicePort;

      if (integrationService) {
        // The service details have been changed in Consul.
        let updatedInfo = {};

        if (ip !== integrationService.ip) {
          integrationService.ip = updatedInfo.ip = ip;
        }

        if (port !== integrationService.port) {
          integrationService.port = updatedInfo.port = port;
        }

        if (Object.keys(updatedInfo).length !== 0) {
          this.emit('service', 'update', {
            ...updatedInfo,
            name: serviceName
          });
        }

        return;
      }

      // New service has been registered in Consul.
      this.integrationServices[serviceName] = {
        ip,
        port,
        watch: serviceWatch
      };

      this.emit('service', 'add', {
        name: serviceName,
        ip,
        port
      });

      return;
    });
  }
}

module.exports = {
  getServicesNames,
  getServiceDetails,
  getServicesDetails,
  getHostnamePort,
  emitter: new ConsulEmitter(consul)
};

