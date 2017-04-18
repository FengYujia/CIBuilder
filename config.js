/*system language*/
global.language = process.argv[2] ? process.argv[2].toUpperCase() : 'CN';

var db = {
	dev: {
		Mongodb: {
			address: '192.168.8.114',
			port: 828
		},
		redis: {
			address: '192.168.8.114',
			port: 565
		}
	},
	product: {
		Mongodb: {
			address: '',
			port: 3000
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
	scriptPath: {
		'restartScript': './shellScripts/shell.sh',
		'gitPath': ['/data/website/storeOrdersSystem', 'asasff']
	}
};