const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-18497.c14.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 18497
    }
});

module.exports = redisClient;