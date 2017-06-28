const Promise = require('bluebird');
const redis = require('redis');
const config = require('ocbesbn-config');

let publisher;

const initRedisConfig = () => new Promise((resolve, reject) => {
  config.init({})
    .then(function(config) { // eslint-disable-line dot-location
      Promise.all([config.getEndPoint('redis'), config.get('redis-auth')])
    })
    .then(([redisConfig, redisAuth = process.env.REDIS_AUTH]) => { // eslint-disable-line dot-location
      publisher = redis.createClient(redisConfig.port, redisConfig.host);
      publisher.auth(redisAuth, (error) => {
        if (error) { reject(error) }

        resolve();
      });
    })
});

exports.initRedisConfig = initRedisConfig;
exports.getPublisher = () => {
  if (!publisher.auth_pass) {
    return initRedisConfig().then(() => publisher)
  }

  return Promise.resolve(publisher);
};
