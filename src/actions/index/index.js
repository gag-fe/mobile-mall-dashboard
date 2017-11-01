import Utils from '../../utils/index';
import Permission from '../../components/permission/index';
import Cookies from 'js-cookie';
import Store from 'store2';
const Ajax = Utils.ajax;
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
moment.locale('zh-cn');
const format = "YYYY-MM-DD";
const zhNow = moment().locale('zh-cn').utcOffset(8);
const gmtNow = moment().format(format);

const API = {
  GET_ORGANIZATION: window.APP_CONFIG.urlFix + '/shops.json',//获取机构
  GET_DAILY_REPORT: window.APP_CONFIG.urlFix + '/mall/getDailyReport.json', //首页数据
  GET_SALETREND: window.APP_CONFIG.urlFix + '/mall/getSaleTrend.json', //销售趋势
  GET_SUMDIM: window.APP_CONFIG.urlFix + '/mall/getSumDim.json',//维度聚合
  GET_CLAIMDETAILS: window.APP_CONFIG.urlFix + '/mall/getClaimDetails.json' //手机上报商家明细
};

function haveNochild(arr,value){
    for (var i=0; i<arr.length; i++) {
            if(arr[i].parentId==value.id){
                    var lt=arr[i];
                    lt.children=[];
                    value.children.push(lt);
                    arr.splice(i--,1);
                }
            }
    return haveChild(arr,value.children);

}
function haveChild(arr,TotalArr){
    if (TotalArr instanceof Array&&TotalArr.length) {
     for(var i=0;i<TotalArr.length;i++){
        haveNochild(arr,TotalArr[i]);
    }
    }else{
        return TotalArr;
    }
}

function deepCopy(p, c) {
　　　　var c = c || {};
　　　　for (var i in p) {
　　　　　　if (typeof p[i] === 'object') {
　　　　　　　　c[i] = (p[i] instanceof Array) ? [] : {};
　　　　　　　　deepCopy(p[i], c[i]);
　　　　　　} else {
　　　　　　　　　c[i] = p[i];
　　　　　　}
　　　　}
　　　　return c;
　　}

    function pickTree(arr){
        var list=[];
        for (var i=0; i<arr.length; i++) {
            if(arr[i].parentId==-1){
            var tt=deepCopy(arr[i]);
                tt.children=[];
                list.push(tt);
                arr.splice(i--,1);
            }
        };
        haveChild(arr,list);
        return list;
    }


function getDefaultOrg(org){
    var data = org[0];
    var currentOrg = {
      name: data.name,
      id: data.id
    };

    if(!data.children || (data.children && data.children.length == 0)){
      currentOrg = data;
    }else{
        if(data.children && data.children[0]){
          currentOrg = data.children[0];
        }else{
          if(data.children && data.children[0].children[0]){
            currentOrg = data.children[0].children[0];
          }else{
            if(data.children && data.children[0].children[0].children[0]){
              currentOrg = data.children[0].children[0].children[0];
            }
          }
        }
    }

    return currentOrg;
  }
const IndexData = {
  //获取机构数据
  getOrganizations(payload, {setState, getState}){
    let treeData = [];
    let currentOrganization = {};

    Ajax({
      url   :API.GET_ORGANIZATION + '?sso_token=' +  Cookies.get('sso_token'),
      data  : {shopId: -1},
      method:'post',
      type  :'json',
    }).then(resp =>{
      if(resp.status == 'S'){
        treeData = pickTree(resp.data);
        if(Store.get('currentOrganization') && Store.get('currentOrganization').id && Store.get('currentOrganization').id != ''){
          currentOrganization = Store.get('currentOrganization');
        }else{
          currentOrganization = Object.assign({}, getDefaultOrg(treeData));
          Store.set('currentOrganization', currentOrganization);
        }

        setState({
          organizations: treeData,
          currentOrganization: currentOrganization
        });
      }
    }).catch(err=>{
      Permission(err);
    });
  },

  //获取首页数据
  getDailyReport(payload, {setState, getState}){
    var params = Object.assign({}, payload, { shopId:getState().currentOrganization.id, 'fromDay': gmtNow, 'toDay': gmtNow });

    Ajax({
      url   :API.GET_DAILY_REPORT,
      data  :params,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        setState({
          dailyReport: resp.data
        });
      }
    }).catch(err=>{
      Permission(err);
    });
  },

  //销售趋势
  getSaleTrend(payload, {setState, getState}){
    var params = Object.assign(payload, {shopId:getState().currentOrganization.id});
    if(params.fromDay && Object.prototype.toString.call(params.fromDay) == '[object Object]'){
       params['fromDay'] = moment(payload.fromDay).format(format);
       params['toDay'] = moment(payload.toDay).format(format);
    }
    Ajax({
      url   :API.GET_SALETREND,
      data  :params,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        setState({
          saleTrend: resp.data.rows
        });
      }
    }).catch(err=>{
      Permission(err);
    });
  },

  //维度聚合
  getSumDim(payload, {setState, getState}){
    var params = Object.assign(payload, {shopId:getState().currentOrganization.id});
    if(params.fromDay && Object.prototype.toString.call(params.fromDay) == '[object Object]'){
       params['fromDay'] = moment(payload.fromDay).format(format);
       params['toDay'] = moment(payload.toDay).format(format);
    }
    Ajax({
      url   :API.GET_SUMDIM,
      data  :params,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        setState({
          sumDim: resp.data
        });
      }
    }).catch(err=>{
      Permission(err);
    });
  },
  //上报列表
  getClaimDetails(payload, {setState, getState}){
    var item = Object.assign({}, payload);
    if(payload.fromDay && Object.prototype.toString.call(payload.fromDay) == '[object Object]'){
      item['fromDay'] = moment(payload.fromDay).format(format);
      item['toDay'] = moment(payload.toDay).format(format);
    }
    Ajax({
      url   :API.GET_CLAIMDETAILS,
      data  :item,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        setState({
          claimDetails: resp.data,
          shopListInfo: payload
        });
      }
    }).catch(err=>{
      Permission(err);
    });
  },

  //店铺详情
  getClaimDetailsInfo(payload, {setState, getState}){
    Ajax({
      url   :API.GET_CLAIMDETAILS,
      data  :payload,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        setState({
          claimDetailsInfo: resp.data
        });
      }
    }).catch(err=>{
      Permission(err);
    });
  },
};

export default IndexData;
