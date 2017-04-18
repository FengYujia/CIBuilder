'use strict';
const mongoose = require('mongoose');
const config = require('../config').config;
const dbUrl = 'mongodb://' +
	config.db.Mongodb.user + ':' + config.db.Mongodb.pwd + '@' +
	config.db.Mongodb.address + ':' + config.db.Mongodb.port + '/pictureAir';
const options = config.db.Mongodb.options;

mongoose.connect(dbUrl,options)
	.then(
		() => {
			console.log('database connect success.');
			console.log('host:' + config.db.Mongodb.address + ':' + config.db.Mongodb.port);
		},
		err => {
			console.log('database connect failed.');
			console.log(err);
		}
	);

module.exports = mongoose;