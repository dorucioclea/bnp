const redis = require("redis");
const publisher  = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
publisher.auth(process.env.REDIS_AUTH, function (err) {
    if (err) throw err;
});

exports.publish = publisher.publish;