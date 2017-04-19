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
	let openAndPull = [];
	for (let i = 0; i < script.gitPath.length; i++) {
		openAndPull.push(`cd ${script.gitPath[i]} \n`);
		openAndPull.push(`git checkout develop \n`);
		openAndPull.push(`git pull origin develop \n`);
	}
	let command = `${scriptPath}${script.restartScript} ${openAndPull}`;
	console.log(command);
	let execScript = new Promise((resolve, reject) => {
		exec(command, (err, stdout, stderr) => {
			console.log(stdout,'======',stderr);
			if (err) {
				return reject(err, stderr);
			}
			return resolve(stdout);
		});
	});
	execScript.then((result) => {
			return ok(res, req.originalUrl, req.body);
		})
		.then(()=>{})
		.catch((err) => {
			return throwErrCode(res, '400', req.originalUrl, err);
		});
});

router.post('/pro/builder', function(req, res, next) {
	return ok(res);
});

module.exports = router;