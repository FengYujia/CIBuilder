var mongoose = require('../databases/mongodb');
var ObjectId = mongoose.Schema.ObjectId;

var storeSchema = new mongoose.Schema({
    //1、商店基本信息
    name: {type: String},
    description: {type: String, default: ''},
    admins: [{adminId: {type: String}}],//管理员Id数组
    source: [
        {
            sourceType: {type: String}, // country/park区分线上线下
            sourceId: {type: String} //countryId Or parkId
        }
    ],

    //2、商店产品信息
    products: [
        {
            productId: {type: String, require: true}, //商品id
            price: {type: Number}, //初始价格
            promotionPrice: {type: Number},//促销价
            cost: {type: Number}, //商品成本,一般这种数据拿不到
            state: {type: Number},//商品状态,-1为特价商品 0为不可使用,1为可使用,2为已卖光
            visitedCount: {type: Number, default: 0},//统计访问次数
            buyCount: {type: Number, default: 0},//统计购买次数
            quantity: {type: Number, default: -1},//库存数量，－1为无限值，其他为固定值
            promotionIds: [{promotionId: {type: String}}],//促销编号
            fulfilmentId: {type: String},//供应商编号
            sequence: {type: Number},//序号
            recordTime: {type: Date, default: Date.now()} //录入时间
        }
    ],
    currency: {type: String, required: true, default:'$'},//币种 $ rmb

    //3、数据信息
    state: {type: Number}, //1为使用，0为禁用
    createdOn: {type: Date, default: new Date()},//创建时间
    createdBy: {type: String},//创建人
    modifiedOn: {type: Date, default: new Date()},//修改时间
    modifiedBy: {type: String}//修改人
});
module.exports = mongoose.model('Store', storeSchema);