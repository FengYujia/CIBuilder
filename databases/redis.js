'use strict';
const redis = require('redis');
const config = require('../config').config;
const redisAddress = config.db.redis.address;
const redisPort = config.db.redis.port;
const option = {
	detect_buffers: true,
	auth_pass: config.db.redis.auth
};

const redisClient = redis.createClient(redisPort, redisAddress, option);

redisClient.auth(option.auth_pass, (res, err) => {
	if (err) {
		console.log('redis authorization failed.', res);
	} else {
		console.log('redis authorization success.', res);
	}
});

redisClient.on('ready', (res, err) => {
	if (err) {
		console.log('redis connect failed.', res);
	} else {
		console.log('redis is ready.', res);
	}
});

redisClient.on('error', (err) => {
	if (err) {
		console.log('redis connect failed.');
	} 
});

exports.redisClient = redisClient;