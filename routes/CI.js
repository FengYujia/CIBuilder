'use strict';

const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;

const scriptPath = require('../config').config.scriptPath;
const throwErrCode = require('../models/server/throwCode').throwErrCode;
const ok = require('../models/server/throwCode').ok;

//1、构建测试环境
router.post('/dev/builder', function(req, res, next) {
	let openAndPull = '';
	for (let i = 0; i < scriptPath.gitPath.length; i++) {
		openAndPull += `cd ${scriptPath.gitPath[i]} \n`;
		openAndPull += `git checkout develop \n`;
		openAndPull += `git pull origin develop \n`;
	}
	let command = `${scriptPath.restartScript} ${openAndPull}`;
	let execScript = new Promise((resolve, reject) => {
		exec(command, (err, stdout, stderr) => {
			if (err) {
				return reject(err, stderr);
			}
			return resolve(stdout);
		});
	});
	execScript.then((result) => {
			return ok(res, req.originalUrl, result);
		})
		.catch((err) => {
			return throwErrCode(res, '400', req.originalUrl, err);
		});
});

router.post('/pro/builder', function(req, res, next) {
	return ok(res);
});

module.exports = router;