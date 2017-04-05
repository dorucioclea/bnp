const redis = require("redis");
const config = require('ocbesbn-config');

let publisher;

config.init({}).then((config) => config.getEndPoint('redis')).then((redisConfig) => {
  publisher = redis.createClient(redisConfig.port, redisConfig.host);

  publisher.auth(process.env.REDIS_AUTH, (err) => { if (err) throw err });
}).catch(console.log);

module.exports = publisher;
