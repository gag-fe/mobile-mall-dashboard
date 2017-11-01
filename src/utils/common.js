
import Cookies from 'js-cookie';

const Utils = {
  merge() {
    const ret = {};
    const args = [].slice.call(arguments, 0);
    args.forEach((a) => {
      Object.keys(a).forEach((k) => {
        ret[k] = a[k];
      });
    });
    return ret;
  },
  login(param) {
    Cookies.remove('user_data', { path: '/' });
    Cookies.remove('com.gooagoo.passpart.sso.token.name', { path: '/', domain: window.Domain });
    if (param == 'out') {
      window.location.href = `https://passport${window.Domain}/index.html`;
    } else {
      window.location.href = `https://passport${window.Domain}/index.html?service=${window.location.host}`;
    }
  },
};

//动态修改微信的头标题
document.setTitle = function(t) {
  document.title = t;
  var i = document.createElement('iframe');
  i.src = '//m.baidu.com/favicon.ico';
  i.style.display = 'none';
  i.onload = function() {
    setTimeout(function(){
      i.remove();
    }, 9)
  };
  document.body.appendChild(i);
};

//二位小数
window.formatCurrency = function(num) {

  if(0 < num  && num < 0.01){
    num = 0.01;
  }

  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  var sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  var cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
};

//获取地址栏参数的方法
window.GetRequest = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  if (window.location.href.indexOf("?") > -1) {
    var r = window.location.href.split("?")[1].substr(0).match(reg);
    if (r !== null) return (r[2]);
    return null;
  } else {
    return null;
  }
};

//生产uuid方法
window.uuid=function(){
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
};

module.exports = Utils;
