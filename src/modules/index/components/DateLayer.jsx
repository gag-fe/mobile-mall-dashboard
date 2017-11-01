import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import { Button, NavBar, Icon, Menu, ActivityIndicator, Drawer, WingBlank, DatePicker, List, Modal} from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const format = "YYYY-MM-DD";
const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment().utcOffset(8);
const minDate = moment().subtract(720, 'days').utcOffset(8);

import '../css/index.less';
const viewMode = {
  visible: false,
  day: ' current',
  today: '',
  week: '',
  month: '',
  fromDay: '',
  toDay: ''
};
const CustomToDay = props => (
  <span onClick={props.onClick}>{props.extra}</span>
);
const CustomFromDay = props => (
  <span onClick={props.onClick}>{props.extra}</span>
);
const DateLayer = React.createClass({
  getInitialState(){
    return {
      timeRange: this.props.timeRange || 'day',//date=1~23小时,week=周一~周日,range<=92天
      fromDay:this.props.fromDay || zhNow,
      toDay: this.props.toDay || zhNow
    };
  },

  _eachViewState(kw){
    for(var key in viewMode){
      if(kw == key){
        viewMode[key] = ' current';
      }else {
        viewMode[key] = '';
      }
    }
  },

  _getTaday(key){
    const item = this.state;
    item['fromDay'] = zhNow;
    item['toDay'] = zhNow;
    item['timeRange'] = 'day';
    this._eachViewState(key);
    this.setState(Object.assign({},this.state,item));
    this.props.callback(item);
  },

  _getWeek(key){
    const item = this.state;
    item['fromDay'] = moment().startOf('week');
    item['toDay'] = zhNow;
    item['timeRange'] = 'week';
    this._eachViewState(key);
    this.setState(Object.assign({},this.state,item));
    this.props.callback(item);
  },

  _getMonth(key){
    const item = this.state;
    item['fromDay'] = moment().startOf('month');
    item['toDay'] = zhNow;
    item['timeRange'] = 'month';
    this._eachViewState(key);
    this.setState(Object.assign({},this.state,item));
    this.props.callback(item);
  },

  _getFromDay(key, value){
    const item = this.state;
    let range = 'range';

    if(item.toDay.valueOf() == value.valueOf()){
      range = 'day';
    }

    if(item.toDay.valueOf() < value.valueOf()){
      this.setState({
        visible: true
      });

      return false;
    }

    item['fromDay'] = value;
    item['timeRange'] = range;
    this._eachViewState(key);
    this.setState(Object.assign({},this.state,item));
    this.props.callback(item);
  },

  _getToDay(key, value){
    const item = this.state;
    let range = 'range';

    if(item.fromDay.valueOf() == value.valueOf()){
      range = 'day';
    }

    if(item.fromDay.valueOf() > value.valueOf()){
      this.setState({
        visible: true
      });

      return false;
    }
    item['toDay'] = value;
    item['timeRange'] = range;
    this._eachViewState(key);
    this.setState(Object.assign({},this.state,item));
    this.props.callback(item);
  },
  _onClose(){
    this.setState({
      visible: false
    });
  },
  componentWillReceiveProps(nextProps){
    var params = {};
    if(this.props.timeRange != nextProps.timeRange){
      if(nextProps.fromDay && Object.prototype.toString.call(nextProps.fromDay) == '[object Object]'){

      }else{
        params['fromDay'] = moment(nextProps.fromDay).locale('zh-cn').utcOffset(8);
        params['toDay'] = moment(nextProps.toDay).locale('zh-cn').utcOffset(8);
      }

      this.setState({
        timeRange: nextProps.timeRange,
        fromDay: params.fromDay,
        toDay: params.toDay
      });
    }
  },
  render(){
    this._eachViewState(this.state.timeRange);
    const { getFieldProps } = this.props.form;
    return (<div>
      <div>
      <Modal
        title="日期选择错误"
        transparent
        maskClosable={false}
        visible={this.state.visible}
        onClose={this._onClose}
        footer={[{ text: '确定', onPress: () => {this._onClose(); } }]}
      >
      <p>请重新选择日期！</p>
      </Modal>
      </div>

      <div className="date-layer">
        <div className={"today " + viewMode.day} onClick={this._getTaday.bind(this,'today')}>今天</div>
        <div className={"week " + viewMode.week} onClick={this._getWeek.bind(this,'week')}>本周</div>
        <div className={"month " + viewMode.month} onClick={this._getMonth.bind(this,'month')}>本月</div>
        <div className={"from-day " + viewMode.fromDay}>
          <DatePicker
            mode="date"
            title="选择日期"
            onChange={this._getFromDay.bind(this,'fromDay')}
            {...getFieldProps('date1', {
              initialValue: this.state.fromDay,
              onChange: this._getFromDay.bind(this,'fromDay')
            })}
            value={this.state.fromDay}
            minDate={minDate}
            maxDate={maxDate}
          >
            <CustomFromDay></CustomFromDay>
          </DatePicker>
        </div>
        <div className="space"> 至 </div>
        <div className={"to-day" + viewMode.toDay}>
          <DatePicker
            mode="date"
            title="选择日期"
            onChange={this._getToDay.bind(this,'toDay')}
            {...getFieldProps('date2', {
              initialValue: this.state.toDay,
              onChange: this._getToDay.bind(this,'toDay')
            })}
            value={this.state.toDay}
            minDate={minDate}
            maxDate={maxDate}
          >
            <CustomToDay></CustomToDay>
          </DatePicker>
        </div>
      </div>
          </div>
    );
  }
});

const DateLayerWrapper = createForm()(DateLayer);
export default DateLayerWrapper;
