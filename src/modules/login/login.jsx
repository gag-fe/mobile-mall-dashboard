import React from 'React';
import Cookies from 'js-cookie';
import loginActions from '../../actions/login/loginActions';
import md5 from 'react-native-md5';
import CopyRight from '../../components/copy-right/index';
import { hashHistory } from 'react-router';
import { createActionContainer } from 'Roof';
import { List, InputItem, Button, Toast, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';
import Store from 'store2';
import loginLess from './css/login.less';
const userIcon = require('../../img/user.png');
const pwIcon = require('../../img/pwd.png');
const verifyIcon = require('../../img/verify.png');
const API = {
    VALIDITY_URL: window.APP_CONFIG.verify + '/verify-image.do?r='
};
var CurrentName = '';
var CurrentPassword = '';
var VerifyCode = '';
class Form extends React.Component {
  static propTypes = {
    prop: React.PropTypes.string
  }

  static defaultProps = {
    prop: 'value'
  }

  constructor(props) {
    super(props);

    this.state = {
      verifyRandom: Math.random()
    };
  }

  componentWillMount() {
    document.body.style.backgroundColor = '#fff';
    document.setTitle('登录');
  }

  componentDidMount() {
    if (window.GetRequest('code') && Cookies.get('sso_token')) {
      this.props.loginActions.getOpenid({
        appid: window.appId,
        code: window.GetRequest('code'),
        authType: '1',
        sence: 'cooperatives',
        state: Cookies.get('sso_token')
      });

      if (this.props.params.targets) {
        let targetUrl = this.props.params.targets.replace(/\|/i, '/');
        window.location.href = window.location.origin+window.location.pathname+'#/'+targetUrl;
      }
    }
  }

  componentWillUnmount() {
    window.APP_CONFIG.isShowConfirm = false;
    document.body.style.backgroundColor = '#fff';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginData && nextProps.loginData.token && this.props.loginData != nextProps.loginData) {
      Cookies.set('sso_token', nextProps.loginData.token);
      let url = "https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri="+encodeURIComponent(window.location.href)+"&appid=" + window.appId + "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
      //window.location.href = url;
      hashHistory.push('index');
    }else {

      if(this.props.errorCode != -1 && (nextProps.form.getFieldValue('userName') == CurrentName && nextProps.form.getFieldValue('password') == CurrentPassword) && !(nextProps.form.getFieldValue('verify') != VerifyCode)){
        this.setState({
          verifyRandom: Math.random()
        });
      }
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error, val) => {
      if (val.userName && val.password) {
        this.props.loginActions.comein({
          account: val.userName,
          password: val.password,
          verifyCode: val.verify,
          PASSPORT_VC: Cookies.get('PASSPORT_VC') || ''
        });

        this.props.setStoreState({
          currentOrganization: Object.assign({},{name:'',id:''})
        });

        window.APP_CONFIG.isShowConfirm = false;
        Store.set('currentOrganization', {name:'',id:''});
      } else {
        Toast.info('请输入正确账号、密码、验证码。', 2);
      }
    });
  }

  _validityChange = (e) => {
      e.preventDefault();
      this.setState({
        verifyRandom: Math.random()
      });
  }

  render() {
    var verifyRandom = this.state.verifyRandom;
    VerifyCode = this.props.form.getFieldValue('verify');
    CurrentName = this.props.form.getFieldValue('userName');
    CurrentPassword = this.props.form.getFieldValue('password');

    const verifyImg = API.VALIDITY_URL + verifyRandom;
    const { getFieldProps, getFieldError } = this.props.form;

    return (<div className="login">
      <WingBlank size="sm">
        <List>
                  <InputItem
                    {...getFieldProps('userName', {
                      onChange(e){},
                      rules: [{required: true}],
                    })}
                    placeholder="请输入邮箱"
                    clear
                  >
                    <div style={{ backgroundImage: `url(${userIcon})`, backgroundSize: 'cover', height: '15px', width: '13px' }} />
                  </InputItem>
                  <InputItem
                    {...getFieldProps('password', {
                      onChange(e){},
                      rules: [{required: true}],
                    })}
                    type="password"
                    placeholder="请输入密码"
                    clear
                  >
                    <div style={{ backgroundImage: `url(${pwIcon})`, backgroundSize: 'cover', height: '15px', width: '13px' }} />
                  </InputItem>
                  <InputItem
                    {...getFieldProps('verify', {
                      onChange(e){},
                      rules: [{required: true}],
                    })}
                    type="verify"
                    placeholder="请输入验证码"
                    clear
                  >
                    <div style={{ backgroundImage: `url(${verifyIcon})`, backgroundSize: 'cover', height: '15px', width: '13px' }} />
                    <div className="validity-box"><img onClick={this._validityChange} className="validity" src={verifyImg}/></div>
                  </InputItem>
                  {/* <span className="sleft" onClick={()=>{hashHistory.push('login/question')}}>登录遇到问题？</span>
                  <span className="sright" onClick={()=>{hashHistory.push(window.location.hash.replace(/#\/login\/in/, 'login/register'))}}>新用户注册</span>*/}
                  <div style={{ padding: '82px 10px 22px 10px' }}><Button className="btn " onClick={this.submit} >登录</Button></div>
                  {/* <p>注册或登录意味着同意我们的<span>规则</span>和<span>政策条款</span></p> */}
                </List>

      </WingBlank>

      <div style={{ position: 'fixed', bottom: '10px', width: '100%', backgroundColor: '#fff'}}>
        <CopyRight/>
      </div>

    </div>)
  }
}

export default createActionContainer({
  currentOrganization:'currentOrganization',
  loginData: 'loginData',
  errorCode: 'errorCode'
},{
  loginActions
})(createForm()(Form));
