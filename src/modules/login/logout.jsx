import React from 'React';
import Cookies from 'js-cookie';
import loginActions from '../../actions/login/loginActions';
import md5 from "react-native-md5";
import {hashHistory} from 'react-router';
import {createActionContainer} from 'Roof';
import { Toast } from 'antd-mobile';

const successIcon = require('../../img/successicon.png');
const errorIcon = require('../../img/erroricon.png');
const helpIcon = require('../../img/helpicon.png');

class LogOut extends React.Component{
  static propTypes = {
    prop: React.PropTypes.string
  }

  static defaultProps = {
    prop: 'value'
  }

  constructor(props) {
    super(props);
  
    this.state = {};
  }

  componentWillMount() {
    if (Cookies.get('BaBaToken') || Cookies.get('token')) {
      this.props.loginActions.comeout();
    } else {
      this.props.loginActions.comeout();
      // let infoPage = this.props.getStoreState().infoPage;

      // infoPage.icon = errorIcon;
      // infoPage.title = '退出失败';
      // infoPage.desc = [['您还没有登陆']];

      // this.props.setStoreState({infoPage: infoPage})
      // hashHistory.push('infoPage');
    }
  }

  render() {
    return (<div>
      
    </div>)
  }
}

export default createActionContainer({

},{
  loginActions
})(LogOut)
