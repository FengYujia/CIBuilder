'use strict';
/*system language*/
global.language = process.argv[2] ? process.argv[2].toUpperCase() : 'CN';

const db = {
	dev: {
		Mongodb: {
			address: '192.168.8.114',
			port: 828,
			user: 'pictureAir',
			pwd: '09871234567',
			options : {}
		},
		redis: {
			address: '192.168.8.114',
			port: 565,
			auth:'09871234567'
		}
	},
	product: {
		Mongodb: {
			address: '',
			port: 3000,
			user: 'pictureAir',
			pwd: '09871234567'
		},
		redis: {
			address: '',
			port: 3001
		}
	}
};

exports.config = {
	port: 3001,
	languagesSuport: ['CN', 'EN'],
	language: global.language,
	db: db[process.env.ENV === 'product' ? process.env.ENV : 'dev'],
	script: {
		'restartScript': 'shell.sh',
		'gitPath': ['/data/website/storeOrdersSystem']
	}
};