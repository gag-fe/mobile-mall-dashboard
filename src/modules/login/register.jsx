import React from 'React';
import Cookies from 'js-cookie';
import loginActions from '../../actions/login/loginActions';
import md5 from "react-native-md5";
import {hashHistory} from 'react-router';
import {createActionContainer} from 'Roof';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import loginLess from './css/login.less';

const userIcon = require('../../img/userIcon@1x.png');
const pwIcon = require('../../img/pwIcon.png');
const checkIcon = require('../../img/checkIcon.png');

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
      codeText: '获取验证码',
      cdoeVal: '',
      codeTicket: '',
      codeState: true,
      nameVal: '',
      pwVal: ''
    };
  }

  componentWillMount() {
    document.body.style.backgroundColor = '#fff';
    document.setTitle('注册');
  }

  componentDidMount() {
    if (window.GetRequest('code') && Cookies.get('token')) {
      this.props.loginActions.getOpenid({
        appid: window.appId,
        code: window.GetRequest('code'),
        authType: '1',
        sence: 'cooperatives',
        state: Cookies.get('token')
      });
      if (this.props.params.targets) {
        let targetUrl = this.props.params.targets.replace(/\|/i, '/');
        window.location.href = window.location.origin+window.location.pathname+'#/'+targetUrl;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.registerData, nextProps.registerData.backData.token)
    if (nextProps.registerData && nextProps.registerData.backData && nextProps.registerData.backData.token) {
      Cookies.set('token', nextProps.registerData.backData.token);
      let url = "https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri="+encodeURIComponent(window.location.href)+"&appid=" + window.appId + "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
      window.location.href = url;
    }
    if (nextProps.registerData && nextProps.registerData.ticket) {
      this.setState({
        codeTicket: nextProps.registerData.ticket
      })
    } else if (nextProps.registerData && nextProps.registerData.backData) {

    }
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = '#f7f7f7';
  }

  getCode = (e) => {
    e.preventDefault();
    const nameVal = this.props.form.getFieldValue('username');

    if (nameVal && /^1\d{10}$/.test(nameVal) && this.state.codeState) {
      
      this.props.loginActions.getCode({
        mobilePhone: nameVal
      })

      this.setState({
        codeState: false
      })
      
      let num = 60;
      const interval = setInterval(()=> {
        if (num > 0) {
          num--;
          this.setState({
            codeText: num + '重新获取'
          });
        } else {

          this.setState({
            codeText: '获取验证码',
            codeState: true
          });
          clearInterval(interval);
        }
      }, 1000);
    } else {
      if (!this.state.codeState) {
        Toast.info('正在获取验证码', 1);
      } else {
        Toast.info('请输入正确手机号', 1);
      }
    }
  }

  changeVal = (val, key) => {
    console.log(val, key)
    this.setState({
      [`${key}`]: val
    })
    console.log(this.state)
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (value.username && value.codeVal && value.password && value.password.length >= 6 && value.password.length <= 16) {
        this.props.loginActions.register({
          mobilePhone: value.username,
          password: md5.hex_md5(value.password).toUpperCase(),
          verifyCode: value.codeVal,
          ticket: this.state.codeTicket
        })
      } else {
        console.log(value.password)
        
        if (!value.username) {
          Toast.info('请输入手机号', 1);
        } else if (!value.codeVal) {
          Toast.info('请输入验证码', 1);
        } else if (!value.password) {
          Toast.info('请输入密码', 1);
        } else if ((value.password && value.password.length < 6) || (value.password && value.password.length > 16)) {
          Toast.info('密码长度为6至16位', 1);
        }
      }
    });
  }
 
  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (<div className="login">
      <section>
        <List>
        <InputItem
          {...getFieldProps('username', {
            rules: [{required: true}],
            onChange: (val)=>{this.changeVal(val, 'username')}
          })}
          clear
          placeholder="请输入手机号"
        >
          <div style={{ backgroundImage: `url(${userIcon})`, backgroundSize: 'cover', height: '15px', width: '13px' }} />
        </InputItem>
        <InputItem
          {...getFieldProps('codeVal', {
            rules: [{required: true}],
          })}
          placeholder="请输入验证码"
          clear
          extra={<div className={this.state.codeText=='获取验证码' ? 'code-container-default' : 'code-container'}>{this.state.codeText}</div>}
          onExtraClick={this.getCode}
        >
          <div style={{ backgroundImage: `url(${checkIcon})`, backgroundSize: 'cover', height: '15px', width: '18px' }} />
        </InputItem>
        <InputItem
          {...getFieldProps('password', {
            rules: [{required: true}],
          })}
          type="password"
          placeholder="请输入密码"
          clear
        >
          <div style={{ backgroundImage: `url(${pwIcon})`, backgroundSize: 'cover', height: '15px', width: '13px' }} />
        </InputItem>
        <div style={{ padding: '60px 10px 22px 10px' }}><Button className="btn" onClick={this.submit} >注册</Button></div>
        {/* <p>注册或登录意味着同意我们的<span>规则</span>和<span>政策条款</span></p>
        {(errors = getFieldError('inputtitle2')) ? errors.join(',') : null} */}
        </List>
      </section>
      <section style={{ position: 'fixed', bottom: '10px', width: '100%', backgroundColor: '#fff'}}>
        <p>客服电话：400-815-5058</p>
      </section>
    </div>)
  }
}
 
export default createActionContainer({
  registerData: 'registerData'
},{
  loginActions
})(createForm()(Form));
