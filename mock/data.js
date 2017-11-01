const Qs = require('qs');
const Mock = require('mockjs');
// 数据持久

var movie = {
  'id|+1': 1,
  'name': '@Name',
};

var name = {
  'id|+1': 1,
  'first': '@FIRST',
  'last': '@LAST',
};

var mockUserList = Mock.mock({
  'userList|55': [{'id|+1': 1, 'name': '@cname', 'age': '@natural(10,50)', 'address': '@city(true)'}]
});

var invoiceTitleList=Mock.mock({
  "invoiceTitleData|10":[{  "invoiceId|+1": 1,"invoiceTitle": '@cname'}]
});
module.exports = {
  // Forward 到另一个服务器
  'GET https://assets.daily/!*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定路径
  'GET https://assets.daily/!*': 'https://assets.online/v2/',

  // Forward 到另一个服务器，不指定来源服务器
  'GET /assets/!*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定子路径
  // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
  'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',

  // 本地文件替换
  'GET /local': './local.js',

  // Mock 数据返回
  'GET /users': [{name: 'sorrycc'}, {name: 'pigcan'}],
  'GET /users/1': {name: 'jaredleechn'},

  // Mock 数据，基于 mockjs
  'POST /tag/user/SearchEmployeeInfo.do': Mock.mock({
    status: 'S',
    success: true,
    'data|40': [{
      'id|+1': 1,
      siteName: '@url',
      domain: '@url',
      description: '@sentence',
      interfacePersonList: '@cname'
    }],
  }),

  'GET /y.do'(req, res) {
    res.status(200);
    res.jsonp(Mock.mock({data: movie, success: true, status: 'S',}), 'cb');
  },

  'POST /z.do'(req, res) {
    var postData = Qs.parse(req.body);
    var pageSize = postData.pageSize;
    var currentPage = postData.currentPage;
    name['id|+1'] = pageSize * (currentPage - 1);
    var tmpl = {};
    tmpl['dataList|' + pageSize] = [name];
    tmpl['success'] = true;
    tmpl['pageSize'] = pageSize;
    tmpl['currentPage'] = currentPage;
    res.json(Mock.mock(tmpl));
  },

  //消费指数
  'POST /shop/getMyConsumeStatisticData.do'(req, res){
    let returnData = {
      status: 'S',
      msg: "操作成功",
      success: true,
      data: {
        consumeData: {
          consumeCount: 12,//累计消费
          maxMount: 1000,//最豪消费
          saveMount: 200,//为您节省
          singleTypeConsumeDatas: [//业态消费数据
            {
              consumeMount: 500,//业态累计消费
              consumePercent: 20.5,//占总消费百分比
              consumeProducts: [//消费商品
                {
                  name: "餐饮1",//商品名称
                  price: 111//价格
                },
                {
                  name: "餐饮2",//商品名称
                  price: 222//价格
                },
                {
                  name: "餐饮3餐饮3餐饮3餐饮3餐饮3餐饮3餐饮3",//商品名称
                  price: 333//价格
                }
              ],
              consumeType: "餐饮"//业态
            },
            {
              consumeMount: 523,//业态累计消费
              consumePercent: 10.5,//占总消费百分比
              consumeProducts: [//消费商品
                {
                  name: "生活1",//商品名称
                  price: 123//价格
                },
                {
                  name: "生活2",//商品名称
                  price: 234//价格
                },
                {
                  name: "生活3",//商品名称
                  price: 345//价格
                },
                {
                  name: "生活3",//商品名称
                  price: 456//价格
                }
              ],
              consumeType: "生活"//业态
            },
            {
              consumeMount: 666,//业态累计消费
              consumePercent: 30,//占总消费百分比
              consumeProducts: [//消费商品
                {
                  name: "服饰1",//商品名称
                  price: 444//价格
                },
                {
                  name: "服饰2服饰2服饰2服饰2服饰2服饰2服饰2服饰2服饰2服饰2服饰2",//商品名称
                  price: 555//价格
                },
                {
                  name: "服饰3",//商品名称
                  price: 666//价格
                },
                {
                  name: "服饰2",//商品名称
                  price: 555//价格
                },
                {
                  name: "服饰3",//商品名称
                  price: 666//价格
                }
              ],
              consumeType: "服饰"//业态
            },
            {
              consumeMount: 777,//业态累计消费
              consumePercent: 30,//占总消费百分比
              consumeProducts: [//消费商品
                {
                  name: "美业1",//商品名称
                  price: 777//价格
                },
                {
                  name: "美业2",//商品名称
                  price: 888//价格
                },
                {
                  name: "美业3",//商品名称
                  price: 999//价格
                },
                {
                  name: "美业1",//商品名称
                  price: 777//价格
                },
                {
                  name: "美业2",//商品名称
                  price: 888//价格
                },
                {
                  name: "美业3",//商品名称
                  price: 999//价格
                }
              ],
              consumeType: "美业"//业态
            },
            {
              consumeMount: 7327,//业态累计消费
              consumePercent: 99,//占总消费百分比
              consumeProducts: [//消费商品
                {
                  name: "娱乐1",//商品名称
                  price: 321//价格
                },
                {
                  name: "娱乐2",//商品名称
                  price: 432//价格
                },
                {
                  name: "娱乐3",//商品名称
                  price: 543//价格
                }
              ],
              consumeType: "娱乐"//业态
            },
            {
              consumeMount: 997,//业态累计消费
              consumePercent: 50,//占总消费百分比
              consumeProducts: [//消费商品
                {
                  name: "旅游1",//商品名称
                  price: 656//价格
                },
                {
                  name: "旅游2",//商品名称
                  price: 767//价格
                },
                {
                  name: "旅游3",//商品名称
                  price: 878//价格
                },
                {
                  name: "旅游3旅游3旅游3旅游3旅游3旅游3" +
                  "旅游3旅游3旅游3旅游3旅游3旅游3旅游3旅游3旅游3",//商品名称
                  price: 878//价格
                },
                {
                  name: "旅游3",//商品名称
                  price: 878//价格
                },
                {
                  name: "旅游3",//商品名称
                  price: 878//价格
                },
                {
                  name: "旅游3",//商品名称
                  price: 878//价格
                }
              ],
              consumeType: "旅游"//业态
            }
          ],
          totalMount: 12000//累计消费
        }
      }
    };
    res.json(returnData);
  },

  //我的商家
  'POST /shop/getMyShopInfo.do'(req, res){
    let returnData = {
      status: 'S',
      msg: "操作成功",
      success: true,
      data: {
        myShopListInfo: [//我的商铺信息
          {
            averageConsume: 88.3,//人均
            averageProducetPrice: 66.6,//件单价
            backConsumeExponent: 20.5,//回头率
            colseTime: "21:00",//关店时间
            consumeTimes: 5,//消费次数
            evaluateScore: 3.5,//评分
            hasDiscountCounpon: true,//是否有打折券
            hasMoneyCounpons: true,//是否有普通券
            id: "1",//实体店Id
            myShopType: "1",//我的店铺类型，1-消费、2-收藏、3-推荐
            recommenderImg: "/src/common/imgs/invoice@2x.png",//推荐人头像
            recommenderNickName: "昵称",//推荐人昵称
            shareId: "DJFIJIEJFUDF93H",//分享Id
            openTime: "11:00",//开店时间
            phone: "888888",//手机号
            shopEntityAddress: "天安门厕所旁",//地址
            shopEntityImg: "/src/common/imgs/shopLogo.png",//店铺图片
            shopEntityName: "铁板烧点111",//店名称
            unInvoiceTimes: 3,//未开发票次数
            waitTimeMinite: 5//等待时间
          },
          {
            averageConsume: 88.3,//人均
            averageProducetPrice: 66.6,//件单价
            backConsumeExponent: 20.5,//回头率
            colseTime: "21:00",//关店时间
            consumeTimes: 5,//消费次数
            evaluateScore: 3.5,//评分
            hasDiscountCounpon: false,//是否有打折券
            hasMoneyCounpons: false,//是否有普通券
            id: "2",//实体店Id
            myShopType: "1",//我的店铺类型，1-消费、2-收藏、3-推荐
            recommenderImg: "/src/common/imgs/invoice@2x.png",//推荐人头像
            recommenderNickName: "人昵称",//推荐人昵称
            shareId: "DJFIJIEJFUDF93H",//分享Id
            openTime: "11:00",//开店时间
            phone: "888888",//手机号
            shopEntityAddress: "天安门厕所旁",//地址
            shopEntityImg: "/src/common/imgs/shopLogo.png",//店铺图片
            shopEntityName: "铁板烧点444",//店名称
            unInvoiceTimes: 3,//未开发票次数
            waitTimeMinite: 5//等待时间
          },
          {
            averageConsume: 88.3,//人均
            averageProducetPrice: 66.6,//件单价
            backConsumeExponent: 20.5,//回头率
            colseTime: "21:00",//关店时间
            consumeTimes: 5,//消费次数
            evaluateScore: 3.5,//评分
            hasDiscountCounpon: true,//是否有打折券
            hasMoneyCounpons: false,//是否有普通券
            id: "1",//实体店Id
            myShopType: "1",//我的店铺类型，1-消费、2-收藏、3-推荐
            recommenderImg: "/src/common/imgs/invoice@2x.png",//推荐人头像
            recommenderNickName: "推昵称",//推荐人昵称
            shareId: "DJFIJIEJFUDF93H",//分享Id
            openTime: "11:00",//开店时间
            phone: "888888",//手机号
            shopEntityAddress: "天安门厕所旁",//地址
            shopEntityImg: "/src/common/imgs/shopLogo.png",//店铺图片
            shopEntityName: "铁板烧点222",//店名称
            unInvoiceTimes: 3,//未开发票次数
            waitTimeMinite: 5//等待时间
          },
          {
            averageConsume: 88.3,//人均
            averageProducetPrice: 66.6,//件单价
            backConsumeExponent: 20.5,//回头率
            colseTime: "21:00",//关店时间
            consumeTimes: 5,//消费次数
            evaluateScore: 3.5,//评分
            hasDiscountCounpon: false,//是否有打折券
            hasMoneyCounpons: true,//是否有普通券
            id: "2",//实体店Id
            myShopType: "1",//我的店铺类型，1-消费、2-收藏、3-推荐
            recommenderImg: "/src/common/imgs/invoice@2x.png",//推荐人头像
            recommenderNickName: "荐昵称",//推荐人昵称
            shareId: "DJFIJIEJFUDF93H",//分享Id
            openTime: "11:00",//开店时间
            phone: "888888",//手机号
            shopEntityAddress: "天安门厕所旁",//地址
            shopEntityImg: "/src/common/imgs/shopLogo.png",//店铺图片
            shopEntityName: "铁板烧点333",//店名称
            unInvoiceTimes: 3,//未开发票次数
            waitTimeMinite: 5//等待时间
          }
        ]

      }
    };
    res.json(returnData);
  },

  //商家详情
  'POST /shop/getMyShopEntityDetail.do'(req, res){
    let shopEntityId =Qs.parse(req.body).shopEntityId;
    let returnData;
    if(shopEntityId==1){
      returnData = {
        status: 'S',
        msg: "操作成功",
        success: true,
        data: {
          myShopInfo:
          {
            averageConsume: 88.3,//人均消费
            averageProducetPrice: 66.6,
            backConsumeExponent: 20.5,//回头指数
            colseTime: "21:00",//关店时间
            commentDatas: [//评论
              {
                commentContent: "评论内容",//评论内容
                commentDate: "2016-11-29 18:31:24",//评论时间
                commenterMobile: "18348549635",//评论人手机号
                commenterNickName: "用户微信昵称",//评论人昵称
                score: 2,//评分
                shopEntityName: "望京店",//实体店名称
                shopImg: "",//实体店图片
                userHeadImg: ""//平路人头像
              },{
                commentContent: "评论内容",//评论内容
                commentDate: "2016-11-29 18:31:24",//评论时间
                commenterMobile: "",//评论人手机号
                commenterNickName: "用户微信昵称",//评论人昵称
                score: 5,//评分
                shopEntityName: "望京店",//实体店名称
                shopImg: "",//实体店图片
                userHeadImg: "http://src"//平路人头像
              },{
                commentContent: "评论内容评论内容评论内容评论内容评论内容评论内容评论内容" +
                "评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容",//评论内容
                commentDate: "2016-11-29 18:31:24",//评论时间
                commenterMobile: "",//评论人手机号
                commenterNickName: "",//评论人昵称
                score: 3.5,//评分
                shopEntityName: "望京店",//实体店名称
                shopImg: "",//实体店图片
                userHeadImg: ""//平路人头像
              },{
                commentContent: "评论内容",//评论内容
                commentDate: "2016-11-29 18:31:24",//评论时间
                commenterMobile: "18348549635",//评论人手机号
                commenterNickName: "用户微信昵称",//评论人昵称
                score: 4,//评分
                shopEntityName: "望京店",//实体店名称
                shopImg: "",//实体店图片
                userHeadImg: ""//平路人头像
              }
            ],
            consumeTimes: 5,//消费次数
            couponInfo: null,//优惠券信息待定
            evaluateScore: 3.5,//店铺平均评分
            hasDiscountCounpon: true,//是否有折扣券
            hasMoneyCounpons: false,//是否有代金券
            id: "DFEL6DS83SAFE",//店铺Id
            monthTop: [//月排行
              {
                img: "",//商品图片
                name: "土豆丝炒肉",//商品名称
                price: 53.6,//商品价格
                isConsume:false//商品是否消费过
              }
            ],
            myShopType: "1",//1-消费、2-收藏、3-推荐
            newProduct: [//店内上新
              {
                img: "",//商品图片
                name: "土豆丝炒肉",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              }
            ],
            openTime: "11:00",//开门时间
            phone: "888888",//店铺电话
            shopEntityAddress: "天安门旁",//店铺地址
            shopEntityImg: "/src/common/imgs/shopLogo.png",//店铺图片
            shopEntityName: "铁板烧点",//店铺名称
            signatureProduct: [//招牌商品
              {
                img: "",//商品图片
                name: "土豆丝炒肉1",//商品名称
                price: 53.6,//商品价格
                isConsume:true,//商品是否消费过
                isCollectDish:true,//是否收藏店铺
                goodsId:'FJI3FJ9DJSA9F3',//商品id
                originPrice:60.3,//商品原价
                isCollected:true,
                productDesc:'商品描述1',
                collectId:'123123123'
              },
              {
                img: "",//商品图片
                name: "土豆丝炒肉2",//商品名称
                price: 59.9,//商品价格
                isConsume:false,//商品是否消费过
                isCollectDish:false,//是否收藏店铺
                goodsId:'123',//商品id
                originPrice:80,//商品原价
                isCollected:false,
                productDesc:'商品描述2',
                collectId:''
              }
            ],
            unInvoiceTimes: 3,//未开发票次数
            waitTimeMinite: 15,//平均等待时间（分）
            hasCollected:true,//是否收藏店铺
            collectId:'333333',

          }
        }
      };
    }

    if(shopEntityId==2){
      returnData = {
        status: 'S',
        msg: "操作成功",
        success: true,
        data: {
          myShopInfo:
          {
            averageConsume: 55.3,//人均消费
            averageProducetPrice: 33.6,
            backConsumeExponent: 56,//回头指数
            colseTime: "21:00",//关店时间
            commentDatas: [//评论
              {
                commentContent: "评论内容评论内容评论内容评论内容",//评论内容
                commentDate: "2016-11-29 18:31:24",//评论时间
                commenterMobile: "18348549635",//评论人手机号
                commenterNickName: "用户微信昵称",//评论人昵称
                score: 4.5,//评分
                shopEntityName: "望京店",//实体店名称
                shopImg: "http://src",//实体店图片
                userHeadImg: ""//平路人头像
              },{
                commentContent: "评论内容",//评论内容
                commentDate: "2016-11-29 18:31:24",//评论时间
                commenterMobile: "18348549635",//评论人手机号
                commenterNickName: "用户微信昵称",//评论人昵称
                score: 3,//评分
                shopEntityName: "望京店",//实体店名称
                shopImg: "http://src",//实体店图片
                userHeadImg: ""//平路人头像
              }
            ],
            consumeTimes: 3,//消费次数
            couponInfo: null,//优惠券信息待定
            evaluateScore: 5,//店铺平均评分
            hasDiscountCounpon: true,//是否有折扣券
            hasMoneyCounpons: true,//是否有代金券
            id: "DFEL6DS83SAFE",//店铺Id
            monthTop: [//月排行
              {
                img: "",//商品图片
                name: "土豆丝炒肉1",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉2",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉3",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉4",//商品名称
                price: 53.6,//商品价格
                isConsume:false//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉5",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉6",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉7",//商品名称
                price: 53.6,//商品价格
                isConsume:false//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉8",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉9",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉10",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              }
            ],
            myShopType: "1",//1-消费、2-收藏、3-推荐
            newProduct: [//店内上新
              {
                img: "",//商品图片
                name: "土豆丝炒肉12",//商品名称
                price: 53.6,//商品价格
                isConsume:false//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉22",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉4",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉42",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉52",//商品名称
                price: 53.6,//商品价格
                isConsume:false//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉62",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              }
            ],
            openTime: "11:00",//开门时间
            phone: "66666666",//店铺电话
            shopEntityAddress: "天安门旁",//店铺地址
            shopEntityImg: "/src/common/imgs/shopLogo.png",//店铺图片
            shopEntityName: "铁板333烧点",//店铺名称
            signatureProduct: [//招牌商品
              {
                img: "",//商品图片
                name: "土豆丝炒肉11",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉22",//商品名称
                price: 53.6,//商品价格
                isConsume:false//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉33",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉44",//商品名称
                price: 53.6,//商品价格
                isConsume:true//商品是否消费过
              },{
                img: "",//商品图片
                name: "土豆丝炒肉55",//商品名称
                price: 53.6,//商品价格
                isConsume:false//商品是否消费过
              }
            ],
            unInvoiceTimes: 2,//未开发票次数
            waitTimeMinite: 30,//平均等待时间（分）
            hasCollected:false,//是否收藏店铺
            collectId:'',
          }
        }
      };
    }

    res.json(returnData);
  },

  //收藏商家 or 单品
  'POST /my/addColl.do'(req, res){
    let shopEntityId =Qs.parse(req.body).shopEntityId;
    let returnData;
      returnData = {
        status: 'S',
        msg: "操作成功",
        success: true,
        data: {
          ret:"12345646"       //新增收藏的收藏id
        }
    };
    res.json(returnData);
  },

  //取消收藏
  'POST /my/cancelColl.do'(req, res){
    let id =Qs.parse(req.body).id;
    let returnData;
    returnData = {
      status: 'S',
      msg: "操作成功",
      success: true,
      data: {
        ret:"true"       //新增收藏的收藏id
      }
    };
    res.json(returnData);
  },

  //分享详情
  'POST /share/getShareDetail.do'(req, res){
    let returnData = {
      status: 'S',
      msg: "操作成功",
      success: true,
      data: {
        shareInfo: {
          averageConsume: 50.5,//人均消费
          averageGoodsPrice: 25,//件单价
          goods: [//shareType=G、J 会有
            {
              eatTimes: 1,//分享者吃过多少次
              goodsId: "JFIEJIF339JJ",//商品id
              goodsImg: "/src/common/imgs/shopLogo.png",//商品图片
              goodsName: "葱爆牛",//商品名称
              price: 20.8,//商品价格
              tatolSale: 100//商品总销售数量
            },
            {
              eatTimes: 2,//分享者吃过多少次
              goodsId: "JFIEJIF339JJ",//商品id
              goodsImg: "/src/common/imgs/shopLogo.png",//商品图片
              goodsName: "葱爆牛",//商品名称
              price: 20.8,//商品价格
              tatolSale: 100//商品总销售数量
            },
            {
              eatTimes: 3,//分享者吃过多少次
              goodsId: "JFIEJIF339JJ",//商品id
              goodsImg: "/src/common/imgs/shopLogo.png",//商品图片
              goodsName: "葱爆牛",//商品名称
              price: 20.8,//商品价格
              tatolSale: 100//商品总销售数量
            },
            {
              eatTimes: 4,//分享者吃过多少次
              goodsId: "JFIEJIF339JJ",//商品id
              goodsImg: "",//商品图片
              goodsName: "葱爆牛",//商品名称
              price: 20.8,//商品价格
              tatolSale: 100//商品总销售数量
            },
            {
              eatTimes: 5,//分享者吃过多少次
              goodsId: "JFIEJIF339JJ",//商品id
              goodsImg: "/src/common/imgs/shopLogo.png",//商品图片
              goodsName: "葱爆牛",//商品名称
              price: 20.8,//商品价格
              tatolSale: 100//商品总销售数量
            }
          ],
          ip: null,
          isHasDiscountCoupon: false,//是否有折扣券
          isHasMoneyCoupon: true,//是否有代金券
          openId: null,
          products: null,
          recommedWords: "这家店的牛肉不错",//分享心得，shareType=J才有
          reconsumePercent: 30,//回头指数
          shareScore: 4.5,//分享评分, shareType=J才有
          shareSource: null,
          shareType: "E",//分享类型 E-实体店  G-单品 J-经验
          shopEntityId: "2",//实体店id
          shopEntityName: "望京店",//店铺名称
          shopLogoImg: "/src/common/imgs/shopLogo.png",//店铺logo图片
          shopShowImg: "/src/common/imgs/shopHeader.png",//店铺展示图片
          shopTypeName: "餐饮",//店铺业态名称
          userId: null,
        }

      }
    };
    res.json(returnData);
  },


//个人中心
  'POST /user/userCenter.do'(req, res) {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        "userData": {
          "billAmount": 25,//我的订单数
          "collectedGoodsPriceChangeAmount": 10,//收藏商品价格变更数量
          "couponAmount": 3,//优惠券数量
          "headImg": "",//头像
          "nickName": "微信昵称"//昵称
        }

      }
    };
    res.json(Mock.mock(retrunData));
  },
//退出成功
  'POST /mobile/logout.do'(req, res) {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {

      }
    };
    res.json(Mock.mock(retrunData));
  },
//历史账单的list
  'POST /bill/getMysBillList.do'(req, res) {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        'billListDatas|5': [
          {
            'id|+1': 1,
            billDate: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: true,
            commented: true,
            goodsAmount: '5',
            goodsName: '烧烤鱼',
            invoicd: true,
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId:'1111'
          }, {
            'id|+1': 1,
            billDate: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: true,
            commented: true,
            goodsAmount: '5',
            goodsName: '烧烤鱼',
            invoicd: false,
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId:'11111'
          }
        ]
      }
    };
    res.json(Mock.mock(retrunData));
  },

  //账单详情
  'POST /bill/getBillDetailInfo.do'(req, res) {
    var postData = Qs.parse(req.body);
    var billId=postData.billId;
    var returnData = {
      status: 'S',
      msg: '操作成功',
      billId: billId,
      data: {
        "billCouponInfo": [//账单优惠券
          {
            "couponId": "1946445464664",//优惠券Id
            "couponMoney": 7.8,//优惠金额
            "couponType": "Z"//优惠券类型
          },
          {
            "couponId": "1946445464664",//优惠券Id
            "couponMoney": 7.8,//优惠金额
            "couponType": "Z"//优惠券类型
          }
        ],

        "billSerialNumber": "2016030252364568",//订单流水号
        "canInvoicing": true,//是否可以开发票
        "createTime": '2015-12-12 12:22:33',//createContainer
        "goodsDetails": [//
          {
            "goodCouponInfo": {//单品优惠券
              "discountamount": 5,//优惠金额
              "goodsid": "88888",//商品id
              "goodsname": "砀山秘制黄桃",//商品名称
              "voucherid": "464645646464546"//优惠券id
            },
            "goodstype": null,//商品类型
            "itemserial": "88888",//
            "name": "砀山秘制黄桃",//商品名称
            "paidinamount": 0,//
            "price": 60,//商品价格
            "discountPrice": 30, //使用优惠券后的价格
            "totalnum": 2,//商品数量
            "totalprice": 0//总金额
          },
          {
            "goodCouponInfo": {//单品优惠券
              "discountamount": 5,//优惠金额
              "goodsid": "88888",//商品id
              "goodsname": "砀山秘制黄桃",//商品名称
              "voucherid": "464645646464546"//优惠券id
            },
            "goodstype": null,//商品类型
            "itemserial": "88888",//
            "name": "砀山秘制黄桃",//商品名称
            "paidinamount": 0,//
            "price": 40,//商品价格
            "discountPrice": 40, //使用优惠券后的价格
            "totalnum": 2,//商品数量
            "totalprice": 3//总金额
          }
        ],
        "id": "FJDIJDKJSOAF7Y93UIFDO",//账单id
        "invoiced": false,//是否开过发票
        "originPirce": 25.3,//原价格
        "payType": "02",//支付方式
        "privilegePrice": 3.2,//优惠金额
        "receivableAmount": 22.1,//实际支付金额
        "shopEntityName": "k吾蟹可鸡",//商家名称
        "shopImg": "",//商铺头像
        "shopName": "大众莲花"//店铺名称

      }

    };
    res.json(Mock.mock(returnData));
  },

  //好友力荐列表
  'POST /recommend/getRecommendByUserId.do' (req, res) {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: [
        {
          recommendId:'1',
          averageConsume: 36.5,//人均价
          recommendDate: "2016-11-29 16:24:46",
          recommendGoodsName: [
            "土豆丝炒肉",
            "蜗牛炒蚯蚓"
          ],
          recommendPersonName: "黑色眼睛",//推荐人
          recommendWords: "这家的菜真是的不错啊啊",
          score: '3',//评分
          shopEntityName: '望京沙特店',
          shopImg: '',
          shopEntityId:'1112'
        },
        {
          recommendId:'2',
          averageConsume: 36.5,//人均价
          recommendDate: "2016-11-29 16:24:46",
          recommendGoodsName: [],
          recommendPersonName: "黑色眼睛",//推荐人
          recommendWords: "这家的菜真是的不错啊啊",
          score: '3',//评分
          shopEntityName: '望京沙特店',
          shopImg: '',
          shopEntityId:'1112'
        }, {
          recommendId:'3',
          averageConsume: 36.5,//人均价
          recommendDate: "2016-11-29 16:24:46",
          recommendGoodsName: [],
          recommendPersonName: "黑色眼睛",//推荐人
          recommendWords: "这家的菜真是的不错啊啊",
          score: '3',//评分
          shopEntityName: 'test',
          shopImg: '',
          shopEntityId:'1112'
        },
        {
          recommendId:'4',
          averageConsume: 36.5,//人均价
          recommendDate: "2016-11-29 16:24:46",
          recommendGoodsName: [
            "土豆丝炒肉",
            "蜗牛炒蚯蚓"
          ],
          recommendPersonName: "nis",//推荐人
          recommendWords: "这家的菜真是的不错啊啊",
          score: '2',//评分
          shopEntityName: '望京沙特店',
          shopImg: '',
          shopEntityId:'1112'
        },

      ]
    };
    res.json(Mock.mock(retrunData));
  },

  //我的分享列表
  'POST /my/myshare.do' (req, res) {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        ret: {
          "pageNo": 1,
          "pageSize": 10,
          "retList": [
            {
              "id": "123465",
              "shopEntityId": "132456789",       //实体店id
              "shopEntityName": "分享测试",    //实体店名字
              "shopLogImg": "",    //实体店图片
              "topicType": "G",                          //  分享类型   G--单品分享  E – 商店分享
              "content": "好吃",                         //分享内容
              "userId": "123456789",                //分享用户ID
              "operateDate": "2015-12-12 12:89:99",   //分享日期
              "score": "8",                                    //评分
              "averConsume": "35",                    //平均消费
              "goodsInfo": [{                                //分享类型为 单品 情况下的 单品详情
                "goodsId": "123",
                "goodsName": "狮子头"
              }]
            },
            {
              "id": "123465",
              "shopEntityId": "132456789",       //实体店id
              "shopEntityName": "分享测试",    //实体店名字
              "shopLogImg": "",    //实体店图片
              "topicType": "G",                          //  分享类型   G--单品分享  E – 商店分享
              "content": "好吃",                         //分享内容
              "userId": "123456789",                //分享用户ID
              "operateDate": "2015-12-12 11:11:21",   //分享日期
              "score": "8",                                    //评分
              "averConsume": "35",                    //平均消费
              "goodsInfo": [{                                //分享类型为 单品 情况下的 单品详情
                "goodsId": "123",
                "goodsName": "狮子头"
              }]

            }
          ]
        }
      }
    };
    res.json(Mock.mock(retrunData));
  },
  //发票抬头列表
  'POST /invoice/getMyInvoiceTitleList.do' (req, res) {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        invoiceTitleData:invoiceTitleList.invoiceTitleData,
      }

    };
    res.json(Mock.mock(retrunData));
  },
  //发票历史列表
  'POST /invoice/getInvoiceHistory.do' (req, res) {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        "invoiceHistoryData|5": [//发票抬头数据
          {
            "createTime": '2012-12-2 12:12:11',//创建时间
            "custName": "发票抬头",//发票抬头、发票信息
            "detail": "发票内容",//商品详情
            "invoiceAmount": "255.5",//开发票合计金额
            "invoiceId": "FIDJFID68F3F",//发票编号UUID生成
            "invoicePrintDate": null,//发票打印更新状态日期
            "invoiceRequestDate": null,//发票申请日期
            "invoiceType": "000000",//发票类型 (000000-普票   其他 -专票)
            "shopEntityId": null,
            "shopEntityName": "望京华彩店",//实体店名称（系统产生）
            "shopName": null
          }
        ]

      }
    };
    res.json(Mock.mock(retrunData));
  },
  //发票抬头详情
  'POST /invoice/getInvoiceTitleDetail.do' (req, res) {
    var postData = Qs.parse(req.body);
    var invoiceTitleId=postData.invoiceTitleId;
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      invoiceTitleId:invoiceTitleId,
      data: {
        "invoiceData": {
          "custAdress": "地址",//付款方地址、注册地址
          "custBank": "银行",//付款方银行、开户行
          "custBankAccount": "888888888",//开户行账号
          "custName": "用户名称",//发票抬头、发票信息
          "custTaxNo": "1232333333",//识别号、税号
          "id": "256456165",//主键ID
          "mobile": "18855223366",//联系电话
          "userId": '222'//用户编号
        }


      }
    };
    res.json(Mock.mock(retrunData));
  },
  //删除抬头
  'POST /invoice/delInvoiceTitle.do'(req, res){
    let id = Qs.parse(req.body).invoiceTitleId;
    let dIndex;
    invoiceTitleList.invoiceTitleData.forEach((item,index)=>{
      if(item.id ==id) dIndex=index;
    });
    invoiceTitleList.invoiceTitleData.splice(dIndex,1);
    let returnData={
      status:'S',
      success:true
    };
    res.json(returnData);
  },
  //添加抬头
  'POST /invoice/addInvoiceTitle.do'(req,res){
    let invoice=Qs.parse(req.body);
      console.log(invoice);
    let  id=invoiceTitleList.invoiceTitleData.length +1;
    invoiceTitleList.invoiceTitleData.push(invoice);
    let returnData ={
      status :'S',
      success:true,
      msg:"添加成功",
      data:{}
    };

    res.json(returnData);
  },
  //编辑抬头
  'POST /invoice/updateInvoiceTitle.do'(req,res){
    let invoice=Qs.parse(req.body),
      id=invoiceTitleList.invoiceTitleData.length +1;
    let dIndex;

      //更新用户
    invoiceTitleList.invoiceTitleData.forEach((item,index)=>{
        if(item.id==invoice.id)
          dIndex=index;
      });
    invoiceTitleList.invoiceTitleData[dIndex]=Object.assign({},invoiceTitleList.invoiceTitleData[dIndex],{
      "custAdress": invoice.custAdress,//付款方地址、注册地址
      "custBank": invoice.custBank,//付款方银行、开户行
      "custBankAccount": invoice.custBankAccount,//开户行账号
      "custName": invoice.custName,//发票抬头、发票信息
      "custTaxNo": invoice.custTaxNo,//识别号、税号
      "mobile": invoice.mobile,//联系电话
      });

    let returnData ={
      status :'S',
      success:true,
      msg:"添加成功",
      data:{}
    };

    res.json(returnData);
  },

  //我的收藏
  'POST /my/mycolls.do' (req, res) {
    var postData = Qs.parse(req.body);
    var pageNo=postData.pageNo;
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      pageNo:pageNo,
      data: {
        "ret":{
          "pageNo":1,
          "pageSize":10,
          "retList":[
            {
              "id":"1B2L7EANSJLSFO1KSQMVHH2CP29DS6E8",
              "shopEntityId":"T_SHOP_ENTITY_010A_4",
              "shopEntityName":"sdfas",                     //实体店名称
              "shopLogoImg":"",           // 实体店logo
              "singlePrice":"12.00",                            // 件单价
              "backIndex":"45",                                   //回头指数
              "averConsume":"25",                              //人平均消费
              "operateDate":"Nov 29, 2016 1:51:07 PM",           //日期
              "userId":"D561ABA50114B8C14B7DC54D9B61BBEB",     //用户id
              "score":"3.5",                                                                         //评分
              "goodId":"1B",                                                                  //商品id
              "goodName":"可口可乐",                                                //商品名称
              "goodPrice":3,                                                               //商品价格
              "goodItemserial":"123456",                                         //商品条形码
              "discountSign":true,                                                    //打折标识
              "couponSign":true,                                                        //优惠标识
              "cutDesc":"比收藏时降价6元",                                       //降价描述
              "topicType":"E"                                                              //收藏类型     E–商户收藏     G--单品收藏
            },
            {
              "id":"1B2L7EANSJLSFO1KSQMVHH2CP29DS6E8",
              "shopEntityId":"T_SHOP_ENTITY_010A_4",
              "shopEntityName":"sdfas",                     //实体店名称
              "shopLogoImg":"",           // 实体店logo
              "singlePrice":"12.00",                            // 件单价
              "backIndex":"45",                                   //回头指数
              "averConsume":"25",                              //人平均消费
              "operateDate":"Nov 29, 2016 1:51:07 PM",           //日期
              "userId":"D561ABA50114B8C14B7DC54D9B61BBEB",     //用户id
              "score":"5",                                                                         //评分
              "goodId":"1B",                                                                  //商品id
              "goodName":"可口可乐",                                                //商品名称
              "goodPrice":3,                                                               //商品价格
              "goodItemserial":"123456",                                         //商品条形码
              "discountSign":true,                                                    //打折标识
              "couponSign":true,                                                        //优惠标识
              "cutDesc":"比收藏时降价6元",                                       //降价描述
              "topicType":"G"                                                              //收藏类型     E–商户收藏     G--单品收藏
            }
          ]
        }

      }
    };
    res.json(Mock.mock(retrunData));
  },

  //取消收藏
  // 'POST /my/cancleColl.do'(req, res){
  //   let id = Qs.parse(req.body).id;
  //   let dIndex;
  //   invoiceTitleList.invoiceTitleData.forEach((item,index)=>{
  //     if(item.id ==id) dIndex=index;
  //   });
  //   invoiceTitleList.invoiceTitleData.splice(dIndex,1);
  //   let returnData={
  //     status:'S',
  //     success:true
  //   };
  //   res.json(returnData);
  // },
  /*
   // 通过自定义函数替换请求
   '/custom-func/:action': function(req, res) {
   // req 和 res 的设计类 express，http://expressjs.com/en/api.html
   //
   // req 能取到：
   //   1. params
   //   2. query
   //   3. body
   //
   // res 有以下方法：
   //   1. set(object|key, value)
   //   2. type(json|html|text|png|...)
   //   3. status(200|404|304)
   //   4. json(jsonData)
   //   5. jsonp(jsonData[, callbackQueryName])
   //   6. end(string|object)
   //
   // 举例：
   res.json({
   action: req.params.action,
   query: req.query,
   });
   },
   */

}
