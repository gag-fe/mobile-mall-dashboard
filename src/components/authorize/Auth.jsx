/**
 * 权限拦截容器
 *
 * @author wenshan
 * @since 1.0.0
 */
import React from 'react';
import { Modal } from 'antd-mobile';
import { hashHistory } from 'react-router';
class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      toUrl: this.props.toUrl || window.location.href
    };
  }
  onClose(){
    this.setState({
      visible: visible
    });
    window.location.href = this.state.toUrl;
  }
  render() {
    console.log(this.props);
    return(
      <Modal
        title="确认"
        transparent
        maskClosable={false}
        visible={true}
        onClose={this.onClose}
        footer={[{ text: '确定', onPress: () => { this.onClose(); } }]}
      >
        <p>登陆超时或没有权限，请联系应用产品负责人！</p>
      </Modal>
    );
  }
};

export default Auth;
