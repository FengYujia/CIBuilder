'use strict';

const httpStatus = require('./httpStatus').httpStatus;
const common = require('../tools/common');
var localIp = '127.0.0.1';
require('dns').lookup(require('os').hostname(), function(err, add) {
	if (err) {
		console.error('Get localIp err', err);
	} else {
		localIp = add;
	}
});

exports.throwErrCode = (res, status, errMsg) => {
	let output = {
		code: status || 500,
		msg: errMsg || 
				((!httpStatus[global.language] ||
					 !common.objectIsEmpty(httpStatus[global.language])) ?
					 	 'Sorry,Language pack does not exist in the system.' : 
					 	 	httpStatus[global.language].errMsg['500']),
		localIp: localIp
	};
	res.send(output);
};

exports.ok = (res, successMsg, data) => {
	let output = {
		code: 200,
		msg: successMsg || '',
		data: data || '',
		localIp: localIp
	};
	res.send(output);
};