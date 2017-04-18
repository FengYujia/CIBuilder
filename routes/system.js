'use strict';

var express = require('express');
var router = express.Router();

var config = require('../config').config;
var httpStatus = require('../models/server/httpStatus').httpStatus;
var throwErrCode = require('../models/server/throwCode').throwErrCode;
var ok = require('../models/server/throwCode').ok;

//1、系统根页面
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'CIBuilder',
		languege: global.languege
	});
});

//2、系统语言选择
router.post('/system/languegeSelection', function(req, res, next) {
	if (!req.body.languege) {
		return throwErrCode(res,'400', httpStatus[global.language].errMsg['400']);
	}
	let languege = (req.body.languege).toUpperCase();
	if (config.languagesSuport.indexOf(languege) < 0) {
		return throwErrCode(res,'401', httpStatus[global.language].languegeSelection['401']);
	}
	global.language = languege;
	return ok(res,httpStatus[global.language].languegeSelection['200']);
});

module.exports = router;