let request = require('request');
let serviceErrorHandlingService = require('./../service/serviceErrorHandlingService');
let onHeaders = require('on-headers');

const consulEmitter = require('./../service/consulService.js').emitter;
const servicesUrls = {};

consulEmitter.on('service', (action, details) => {
  switch (action) {
    case 'add':
      servicesUrls[details.name] = 'http://' + details.ip + ':' + details.port;
      break;
    case 'delete':
      delete servicesUrls[details.name];
      break;
    case 'update':
      servicesUrls[details.name] = 'http://' + details.ip + ':' + details.port;
      break;
    default:
      break;
  }
  console.log(`===== servicesUrls[${details.name}] =====`, servicesUrls[details.name]);
});

function scrubETag(res) {
  onHeaders(res, function() {
    this.removeHeader('ETag')
  })
}

function proxyServices(req, res) {
  let url = req.url.replace('/gateway/', '');
  let service = url.substr(0, url.indexOf('/'));

  return request({
    method: req.method,
    uri: servicesUrls[service] + url.replace(service, ''),
    headers: {
      accept: req.headers.accept,
      'content-type': req.headers['content-type'],
      cookie: req.headers.cookie,
      'if-modified-since': req.headers['if-modified-since'],
      'if-none-match': req.headers['if-none-match'],
      'JCATALOG_USER': 'jcadmin' // Only needed for Users API
    },
    json: req.body
  }, (error, response, body) => {
    if (error) {
      let errors = serviceErrorHandlingService.parseError(error, service.charAt(0).toUpperCase() + service.slice(1)) ||
        {
          error,
          status: response ? response.statusCode : 500
        };

      return res.status(errors.status).send(errors);
    }

    if (response.headers['etag']) {
      res.header('etag', response.headers['etag']);
    }

    if (response.headers['last-modified']) {
      res.header('last-modified', response.headers['last-modified']);
    }

    return res.status(response.statusCode).send(body);
  });
}

function getBundle(req, res) {
  let service = req.url.replace('/gateway/bundle/', '').replace('.js', '');
  // ETag header is not used as for js files it gets modified by Apache
  scrubETag(res);

  return request(
    {
      method: req.method,
      uri: `${servicesUrls[service]}/static/bundle.js`,
      headers: {
        accept: req.headers.accept,
        'content-type': req.headers['content-type'],
        'if-modified-since': req.headers['if-modified-since']
      }
    },
    (err, response, body) => {
      if (err) {
        let errors = serviceErrorHandlingService.parseError(err, service.charAt(0).toUpperCase() + service.slice(1)) ||
          {
            ...err,
            status: response ? response.statusCode : 500
          };

        return res.status(errors.status).send(errors);
      }

      if (response.headers['last-modified']) {
        res.header('last-modified', response.headers['last-modified']);
      }

      res.header('Content-Type', 'application/javascript');
      return res.status(response.statusCode).send(body);
    }
  );
}

module.exports = {
  proxyServices,
  getBundle
};
