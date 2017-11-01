import 'antd-mobile/dist/antd-mobile.less';
import './index.less';
import Cookies from 'js-cookie';

if(!APP_CONFIG){
  window.APP_CONFIG = {};
}

window.DEV_STATE = 0;
window.SubDomains = "http://dashboard";

(function(strUrl){
  const RGE_TEST = new RegExp('.test.');
  const RGE_PRESSURE = new RegExp('.pressure.');

  if(RGE_TEST.test(strUrl)){
    DEV_STATE = 1;
    window.Domain = ".test.goago.cn";
    window.appId = 'wx612d91de0f95d919';
    window.SubDomains = "http://data";
  }else if(RGE_PRESSURE.test(strUrl)){
    DEV_STATE = 1;
    window.Domain = ".pressure.goago.cn";
    window.appId = 'wx612d91de0f95d919';
    window.SubDomains = "http://data";
  }else{
    DEV_STATE = 0;
    window.Domain = ".gooagoo.com";
    window.appId = 'wxd3b4db5a7a6a8e6d';
    window.SubDomains = "http://dashboard";

  }

})(window.location.origin);

if(!window.APP_CONFIG){
  window.APP_CONFIG = {};
}else{
  APP_CONFIG['sso_token'] = Cookies.get('sso_token') || 'undefined';
  APP_CONFIG['userData'] = {};
  APP_CONFIG['isShowConfirm'] = false; //权限提示

  if(DEV_STATE == 0){
    APP_CONFIG['urlFix'] = window.SubDomains + window.Domain;
    APP_CONFIG['urlLogin'] = 'https://passport' + window.Domain;
    APP_CONFIG['verify'] = 'https://passport' + window.Domain;
  }else{
    APP_CONFIG['urlFix'] = window.SubDomains + window.Domain;
    APP_CONFIG['urlLogin'] = 'https://passport' + window.Domain;
    APP_CONFIG['verify'] = 'https://passport' + window.Domain;
  }
}
