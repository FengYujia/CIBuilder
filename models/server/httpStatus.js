'use strict';

exports.httpStatus = {
	'CN': {
		'errMsg': {
			'500': '对不起,服务端出错...',
			'501': '对不起,API返回值Key错误.',
			'502': '对不起,API状态码或错误信息定义错误.'
		},
		'system': {
			'languegeSelection': {
				'200': '语言转换成功.',
				'400': '对不起,参数信息不完整.',
				'401': '对不起,暂不支持该语言.'
			}
		},
		'CI': {
			'dev': {
				'builder': {
					'200': '脚本执行成功',
					'400': '对不起,脚本执行错误.'
				}
			}
		}
	},
	'EN': {
		'errMsg': {
			'500': 'sorry, the server error...',
			'501': 'Sorry, API returns an error value Key.',
			'502': 'Sorry, API status code or error messege is incorrectly defined.'
		},
		'system': {
			'languegeSelection': {
				'200': 'Language selection success.',
				'400': 'Sorry, the parameter information is incomplete.',
				'401': 'Sorry,We do not support the language right now.'
			}
		},
		'CI': {
			'dev': {
				'builder': {
					'200': 'The script was executed successfully',
					'400': 'Sorry,Script is error.'
				}
			}
		}
	}
};