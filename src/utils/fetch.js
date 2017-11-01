import $ from 'jquery';
import { Toast, Modal } from 'antd-mobile';
import Auth from '../components/authorize/Auth';
import utils from './common.js';
import Cookies from 'js-cookie';
import React from 'react';
import { hashHistory } from 'react-router';
import Store from 'store2';

window.APP_CONFIG.isShowConfirm = false; //confirm 是否展示过

const showError = function (msg) {
  Toast.info(msg, 2);
};

const goLogin = function(back) {
  let target = window.location.hash.replace(/^\#\//, '').replace(/\//g, '|');
  let msg = back.msg || back.message;
  Cookies.remove('sso_token');
  Store.set('currentOrganization', {name:'',id:''});
  Toast.info(msg, 1, () => {
    if (!window.APP_CONFIG.isShowConfirm) {
      window.APP_CONFIG.isShowConfirm = true;
      hashHistory.push('login/in/'+ target);
      //window.location.href = window.location.origin + window.location.pathname+'#/login/in/'+target;
    }
  });
  //return (target.indexOf('login/in')<0 ? hashHistory.push('login/in/'+target) : true);
};

const bindGuide = function(back) {
  return window.location.href = window.location.origin+window.location.pathname+'#/index';
};

const notice = {
  INVOKE_ERROR: '调用后台接口出错，请联系管理员',
  AUTH_FAIL: '亲，您没有权限，请申请权限',
};


const adapter = function (data) {
  return data;
};

const defaultOptions = {
  url: '',
  type: 'POST',
  dataType: 'json',
  async: true,
  data: {},
  adapter, // resultDTO解析方法
  /*
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true,
  */
  alertError: true, // 是否弹出错误提示窗口
  parallel: false, // 是否并行发送批量请求
  isSuccess(resp) { // 自定义逻辑判断是否成功
    return resp.status === 'S' || resp.success === true || resp.status === 'success' || resp.status === 'OK';
  },
  isAccessDeny(resp) { // 判断是否没有权限
    return resp.status === 'NO_LOGIN' || resp.status === 'T' || resp.status === 'timeout' || resp.status === 'ERR' || resp.status === 'F';
  }
};

const Fetch = function (options) {
  options['data']['sso_token'] = Cookies.get('sso_token');
  options = Object.assign({}, defaultOptions, options);
  return new Promise((resolve, reject) => {
    $.ajax(options)
    .done(function(resp) {
      if (typeof resp == 'string' && (options.type === 'json' || options.type === 'jsonp')) {
        resp = JSON.parse(resp);
      }
      resp = options.adapter(resp);
      if (options.isSuccess(resp)) {
        resolve(resp);
      } else {
        const errorMsg = resp.msg || resp.message || notice.INVOKE_ERROR;
        let accessDeny = false;
        if (options.isAccessDeny(resp)) { // 没有权限
          accessDeny = true;
          if(resp.errorCode == 2){
            resolve(resp);
            showError(errorMsg,2);
          }else {
            resolve(resp);
            goLogin(resp);
          }
        } else {
          resolve(resp);
          Toast.hide();
          goLogin(resp);
          reject({
            accessDeny,
            resp
          });
        }
      }
    })
    .fail(function(resp, e, context) {
      reject({
        resp,
        e,
        context
      });
    });

  });
};

export default Fetch;
