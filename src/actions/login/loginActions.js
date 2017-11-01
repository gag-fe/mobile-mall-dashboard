import {hashHistory} from 'react-router';
import Cookies from 'js-cookie';
import Utils from '../../utils/index';
import Permission from '../../components/permission/index';
import {Toast} from 'antd-mobile';

const successIcon = require('../../img/successicon.png');
const errorIcon = require('../../img/erroricon.png');
const helpIcon = require('../../img/helpicon.png');
const ajax = Utils.ajax;

const API = {
  loginUrl:  window.APP_CONFIG.urlLogin + '/login.do',
  logoutUrl: '/ecologyShop/logout.do',
  registerUrl: '/ecologyShop/register.do',
  getCodeUrl: '/ecologyShop/sendMobileVerifyCode.do',
  getOpenidUrl: '/qwx/AJAXoauth.do'
};

const loginActions = {
  //login
  comein(param, {setState, getState}){
    ajax({
      url: API.loginUrl,
      data: param,
      type: 'post',
      dataType  :'json'
    }).then(resp=>{
      //if(resp.status == 'Ss' || resp.status == 'OKo') {
      if(resp.status == 'S' || resp.status == 'OK') {
        console.log('成功');
        Cookies.set('sso_token',resp.body.token);
        setState({
          loginData: resp.body
        });
      }else{
        setState({
          errorCode: resp.errorCode
        });

      }
    }).catch(err=>{
      Permission(err)
    });
  },
  //logout
  comeout(param, {setState, getState}){
    ajax({
      url: window.GOODS_URL + API.logoutUrl,
      data: param,
      type: 'post',
      dataType  :'json',
      async: false
    }).then(resp=>{
      if(resp.status == 'S') {
        Cookies.remove('sso_token');
        Cookies.remove('BaBaToken');
        let infoPage = getState().infoPage;

        infoPage.icon = successIcon;
        infoPage.title = '退出成功';
        infoPage.desc = [['您的账号已经安全退出']];

        setState({infoPage: infoPage})
        hashHistory.push('infoPage');
      }
    }).catch(err=>{
      if (err.status === 'FP') {
        let infoPage = getState().infoPage;

        infoPage.icon = errorIcon;
        infoPage.title = '退出失败';
        infoPage.desc = [[err.msg]];

        setState({infoPage: infoPage})
        hashHistory.push('infoPage');
      }
    });
  },
  //register
  register(getCodeParams, {setState, getState}){
    ajax({
      url   :window.GOODS_URL + API.registerUrl,
      data  :getCodeParams,
      type:'post',
      dataType  :'json',
    }).then(resp=>{
      if (resp.status == 'S') {
        setState({
          registerData: {
            backData: resp.data,
            ticket: getState().registerData.ticket
          }
        })
        // hashHistory.push('invoice/invoicePrice');
      }
    }).catch(err=>{
      Permission(err)
    });
  },
  //get code
  getCode(getCodeParams, {setState, getState}){
    ajax({
      url   :window.GOODS_URL + API.getCodeUrl,
      data  :getCodeParams,
      type:'post',
      dataType  :'json',
    }).then(resp=>{
      if (resp.status == 'S') {
        setState({
          registerData: {
            ticket: resp.data.ticket
          }
        })
      }
    }).catch(err=>{
      Permission(err)
    });
  },
  //get openid
  getOpenid(getCodeParams, {setState, getState}){
    ajax({
      url   :window.WX_URL + API.getOpenidUrl,
      data  :getCodeParams,
      type:'post',
      dataType  :'json',
      async: false
    }).then(resp=>{
      if (resp.status == 'S') {
      }
    }).catch(err=>{
      Permission(err)
    });
  }
};

export default loginActions;
