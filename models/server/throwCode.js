'use strict';

const httpStatus = require('./httpStatus').httpStatus;
const common = require('../tools/common');

//0_1、获取本机IP
var localIp = '127.0.0.1';
require('dns').lookup(require('os').hostname(), function(err, add) {
	if (err) {
		console.error('Get localIp err', err);
	} else {
		localIp = add;
	}
});

//1_1、获取错误信息
var getMsg = (code, originalUrl) => {
	let url = originalUrl.split('/');
	let msg = httpStatus[global.language];
	let status = code ? code : url = ['errMsg', '500'];
	for (let i = 0; i < url.length; i++) {
		if (url[i] !== '') {
			msg = msg[url[i]];
			if (msg === undefined) {
				return httpStatus[global.language].errMsg['501'];
			}
		}
	}
	return msg[status];
};

//1、丢出错误信息
exports.throwErrCode = (res, status, originalUrl, data) => {
	let code = '';
	let errMsg = '';
	if (!status) {
		code = '500';
		errMsg = ((!httpStatus[global.language] ||
				!common.objectIsEmpty(httpStatus[global.language])) ?
			'Sorry,Language pack does not exist in the system.' :
			httpStatus[global.language].errMsg['500']);
	} else {
		code = status;
		errMsg = getMsg(code, originalUrl);
	}
	let output = {
		code: code,
		msg: errMsg,
		data: data,
		localIp: localIp
	};
	res.send(output);
};

//2、返回正确信息
exports.ok = (res, originalUrl, data) => {
	let successMsg = getMsg('200', originalUrl);
	let output = {
		code: '200',
		msg: successMsg || '',
		data: data || '',
		localIp: localIp
	};
	res.send(output);
};