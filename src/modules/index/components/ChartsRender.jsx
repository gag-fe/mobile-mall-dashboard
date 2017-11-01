import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import Chart from 'rc-echarts';
import { Button, NavBar, Icon, Menu, ActivityIndicator, Drawer} from 'antd-mobile';
import '../css/index.less';

const ChartsRender = React.createClass({
  render(){
    return (
      <Chart options={this.props.options} onReady={this.props.onReady}></Chart>
    );
  }
});

export default ChartsRender;
