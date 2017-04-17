var mongoose = require('../databases/mongodb');
var ObjectId = mongoose.Schema.ObjectId;

var ParkSchema = new mongoose.Schema({
    //1、乐园基本信息
    country: {type: String, index: true},   //国家
    province: String,   //省
    city: String,   //城市
    address:String, //地址
    chain: String,   //连锁乐园名
    parkId:String,  //parkId 线下使用
    parkCode:String,    //乐园简码与条码包含的简码相同；
    name: {type: String},   //乐园名称
    description: {type: String},   //描述
    servers: [  //服务器信息
        {
            serverId:String,//服务器Id
            IP: String, //服务器Ip
            orderAPIUrl:String,//下单服务器IP及端口号http://192.168.8.3:3006
            name: String, //服务器名称
            isDel:{type:Boolean,default:false},//server是否不可用
            outlets:[String],//outletId
            locations:[String] //locationId
        }
    ],
    coverHeaderImage: {type: String}, //乐园头部背景图url
    avatarUrl: {type: String}, //乐园头像url
    contact: { //
        telephone: String, //联系电话
        email: String, //email
        address: String //联系地址
    },

    //2、乐园地点信息
    locations: [
        {
            locationId:String,//地点Id
            orderNo:{type:Number,default:0},//排序字段
            // rootId:String,//location根节点Id
            parentId:{type:Number,default:0},    //location父级Id
            //location的类型,
            //（摄影师拍摄点-shootSpot，用于相册分组-albumGroup，园区板块-partition）
            locationType:{type:String,default:"albumGroup"}, 
            shootType:{type:String,default:'character'},//拍摄点区分：character,attraction
            characters:[{//如果拍摄点是character类型，才有characters
                character:String,
                characterIcon:{
                    imgPath:String, //图片物理路径
                    imgUrl:String   //图片url
                }
            }],
            isDel:{type:Boolean,default:false},//地点是否不可用
            location: String, //拍摄点名称
            location_EN:String,//拍摄点英文名
            description:{type:String,default:''},//描述
            description_EN:{type:String,default:''},//英文描述
            favoriteCount:{type:Number,default:0},//被收藏次数
            GPS: { //GPS信息
                ImageUniqueID: String,
                GPSInfo: String,
                GPSLatitudeRef: String,
                GPSLatitude: String,
                GPSLongitudeRef: String,
                GPSLongitude: String,
                GPSAltitudeRef: String,
                GPSAltitude: String,
                GPSTimeStamp: String,
                GPSDateStamp: String
            },
            cameralPrefixes: String, //相机前缀

            defaultPhoto: String, //地点图片
            defaultPhotoPath:String,//地点图片物理路径
            cameralConfig:{
                aperture:String,    //光圈
                ISO:String,         //ISO
                shutter:String,     //快门
                lens:String,        //镜头型号
                flash:Boolean,         //闪光灯
                whiteBalance:String      //白平衡
            },
            createdOn: Date,//创建时间
            modifiedOn: Date,//修改时间
            createdBy: String,//创建者ID
            modifiedBy: String, //创建者ID
            appServerIp:String,//
            ftpServerIp:String,//
            outlets:[String],//outletId
            isAd:{type:Boolean,default:false},//是否是广告点
            adWords:{EN:String, //广告词
                CN:String
            } ,     
            visibility:{type:Boolean,default:true}, //是否在location展示列表可见
            subject:{type:String,index:true}    //location的主题
        }
    ],

    //3、门店信息
    outlets: [ 
        {
            outletId: String, //门店id
            outletName: String, //门店
            remark: String, //备注
            contact: { //联系方式
                telephone: String, //联系电话
                email: String, //email
                address: String //联系地址
            },
            terminals: [ //终端信息
                {
                    terminal: String, //终端:viewing Station,communicator,preview wall,self service kiosk
                    IP: String //Ip
                }
            ],
            createdOn: Date,//创建时间
            modifiedOn: Date,//修改时间
            createdBy: String,//创建者ID
            modifiedBy: String, //创建者ID
            isPickUpPoint:{type:Boolean,default:false},//是否是提货点
            serverId:String,//serverId,对应的生成订单的api服务器
            locations:[String]//locationId
        }
    ],

    //4、管理员以及网站信息
    admins: {type: [String], index: true}, //管理员Ids
    pageUrl: {type: String}, //主页url
    surveyId: String, //调查问卷

    //5、乐园与用户的关系
    sharedUsers: [String], //分享乐园的用户Ids
    likedUsers: [String], //喜欢乐园的用户Ids
    visitedUsers: [String], //访问过乐园的用户Ids

    //6、数据记录信息
    active: {type: Boolean, default: true}, //是否有效
    isDel:{type:Boolean,default:false},     //是否已删除
    operationInfo: [
        {
            applyOn: String, //日期类型：weekday/date
            date: Number, //日期值
            operationTime: [
                { 
                    beginTime: String, //运营开始时间
                    endTime: String //运营结束时间
                }
            ]
        }
    ],
    createdOn: {type: Date, default: new Date()},//创建时间
    modifiedOn: {type: Date, default: new Date()},//修改时间
    createdBy: String,//创建者ID
    modifiedBy: String //创建者ID
});

module.exports = mongoose.model('Park', ParkSchema);