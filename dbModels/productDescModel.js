var mongoose = require('../databases/mongodb');
var ObjectId = mongoose.Schema.ObjectId;

var productDescSchema = new mongoose.Schema({
    //1、商品描述
    content:[
        {
            language: {type: String,default:'CN'},
            desc:String,
            otherDesc:[]
        }
    ],
    //2、数据创建信息
    createdOn: {type: Date, default: new Date()},//创建时间
    createdBy: {type: String},//创建人
    modifiedOn: {type: Date, default: new Date()},//修改时间
    modifiedBy: {type: String}//修改人
});
module.exports = mongoose.model('productDesc', productDescSchema);