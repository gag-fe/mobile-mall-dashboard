import React from 'React';
import {hashHistory} from 'react-router';
import { List, Button } from 'antd-mobile';
import loginLess from './css/login.less';

const Item = List.Item;
const Brief = Item.rbief;

class Question extends React.Component {
  static propTypes = {
    prop: React.PropTypes.string
  }

  static defaultProps = {
    prop: 'value'
  }

  componentWillMount() {
    document.body.style.backgroundColor='#fff';
    // console.log(this.props.form)
  }

  componentDidMount() {
    console.log(this.props.form)
  }

  componentWillUnmount() {
    document.body.style.backgroundColor='#f7f7f7';
  }

  submit = () => {
    hashHistory.push('login/in/null')
  }
 
  render() {
    return (<section className="login" style={{backgroundColor: '#fff', marginTop: '20px', textAlign: 'left'}}>
      <List>
        <Item wrap>1.原通过邮箱账号方式登录的商家，可继续使用邮箱+密码方式登录</Item>
        <Item wrap>2.原通过邮箱账号方式登录的商家，可继续使用邮箱+密码方式登录</Item>
        <div style={{ padding: '82px 10px 22px 10px' }}><Button className="btn" onClick={this.submit} >我知道了</Button></div>
      </List>
    </section>)
  }
}
 
export default Question;
