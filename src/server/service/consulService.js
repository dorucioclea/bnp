'use strict';

const consul = require('consul')({ host: 'dockerhost' });
const EventEmitter = require('events');

class ConsulEmitter extends EventEmitter {
  integrationServices = {};

  constructor(consul) {
    super();

    let servicesListWatch = consul.watch({
      method: consul.catalog.service.list
    });

    servicesListWatch.on('error', err => {
      console.log('ERROR WATCHING SERVICES:', err);
      this.emit('service', 'error', err);
    });

    servicesListWatch.on('change', (allServices, res) => {  // NOTE: first event happens immediatelly after watch call.
      let updatedServices = Object.keys(allServices).reduce((hash, serviceName) => {
        if (allServices[serviceName].indexOf('external') === -1) {
          return hash;
        }

        if (!this.integrationServices[serviceName]) {
          // New service has been registered in Consul.
          let serviceWatch = consul.watch({
            method: consul.catalog.service.nodes,
            options: {
              service: serviceName
            }
          });

          serviceWatch.on('error', err => {
            console.log(`ERROR WATCHING SERVICE ${serviceName}:`, err);
            this.emit('service', 'error', err);
          });

          serviceWatch.on('change', (serviceInfo, res) => {
            if (!Array.isArray(serviceInfo) || serviceInfo.length === 0) {
              let err = new Error('Unknown service', serviceName);
              console.log(`ERROR UPDATING SERVICE ${serviceName}:`, err);
              this.emit('service', 'error', err);
              return;
            }

            let host = serviceInfo[0].ServiceAddress;
            let port = serviceInfo[0].ServicePort;
            let integrationService = this.integrationServices[serviceName];

            if (integrationService) {
              // Service details have been changed in Consul.
              let updatedInfo = {};

              if (host !== integrationService.host) {
                integrationService.host = updatedInfo.host = host;
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
            } else {
              // New service has been registered in Consul.
              this.integrationServices[serviceName] = {
                host,
                port,
                watch: serviceWatch
              };

              this.emit('service', 'add', {
                name: serviceName,
                host,
                port
              });
            }
          });
        }

        hash[serviceName] = true;  // eslint-disable-line no-param-reassign
        return hash;
      }, {});

      Object.keys(this.integrationServices).forEach(serviceName => {
        if (!updatedServices[serviceName]) {
          this.integrationServices[serviceName].watch.end();
          delete this.integrationServices[serviceName];
          this.emit('service', 'delete', serviceName);
        }
      });
    });

    this.once('newListener', (event, listener) => {
      if (event === 'service') {
        // Inform new listener about all available services.
        Object.keys(this.integrationServices).forEach(serviceName => {
          let details = { ...this.integrationServices[serviceName] };
          delete details.watch;
          listener('add', details);
        });
      }
    });
  }
}

const consulEmitter = new ConsulEmitter(consul);
module.exports = consulEmitter;

