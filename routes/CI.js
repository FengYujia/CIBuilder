'use strict';

var express = require('express');
var router = express.Router();
var throwErrCode = require('../models/server/throwCode').throwErrCode;
var ok = require('../models/server/throwCode').ok;

/* GET users listing. */
router.get('/', function(req, res, next) {
	// res.send('respond with a resource');
	return throwErrCode(res);
});

router.get('/builder', function(req, res, next) {
	return ok(res);
});

module.exports = router;