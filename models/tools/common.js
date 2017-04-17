'use strict';

//判断对象是否为空
exports.objectIsEmpty = (obj) => {
	for(let i in obj){
		if(obj[i]){
			return true;
		}
	}
	return false;
}; 