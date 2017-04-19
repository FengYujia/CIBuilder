'use strict';

const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;

const script = require('../config').config.script;
const scriptPath = '../shellScript/';
const throwErrCode = require('../models/server/throwCode').throwErrCode;
const ok = require('../models/server/throwCode').ok;

//1、构建测试环境
router.post('/dev/builder', function(req, res, next) {
	let userName = req.body.user_name;
	let commitId = req.body.after;

	//1、打开文件夹以及拉取
	let openAndPull = '';
	for (let i = 0; i < script.gitPath.length; i++) {
		openAndPull += `
		cd ${script.gitPath[i]} \n`;
		openAndPull += `git checkout develop \n`;
		openAndPull += `git pull origin develop \n`;
	}
	//2、重启pm2
	let projectName = '';
	for (let i = 0; i < script.projectName.length; i++) {
		projectName += ` ${script.projectName[i]}`;
	}
	openAndPull += `pm2 reload ${projectName}\n`;
	let execScript = new Promise((resolve, reject) => {
		exec(openAndPull, (err, stdout, stderr) => {
			if (err) {
				return reject(err, stderr);
			}
			return resolve(stdout);
		});
	});
	execScript.then((result) => {
			return ok(res, req.originalUrl, req.body);
		})
		.catch((err) => {
			return throwErrCode(res, '400', req.originalUrl, err);
		});
});

router.post('/pro/builder', function(req, res, next) {
	return ok(res);
});

module.exports = router;