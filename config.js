global.language = process.argv[2] ? process.argv[2].toUpperCase() : 'CN';

exports.config = {
	port: 3001,
	languagesSuport: ['CN', 'EN'],
	language: global.language,
	dev: {
		Mongodb: {
			address: '',
			port: 3000
		},
		redis: {
			address: '',
			port: 3001
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
	},
	scriptPath: {
		'restartScript': './shellScripts/shell.sh',
		'gitPath':['/data/website/storeOrdersSystem','asasff']
	}
};