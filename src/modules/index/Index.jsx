import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import { WingBlank } from 'antd-mobile';
import IndexData from '../../actions/index/index';
import MenuOrgAction from './components/MenuOrgAction.jsx';
import DailyReportTop from './components/DailyReportTop.jsx';
import SaleTrend from './components/SaleTrend';
import SaleMap from './components/SaleMap';
import DateLayer from './components/DateLayer';
import CopyRight from '../../components/copy-right/index';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const format = "YYYY-MM-DD";
const gmtNow = moment().format(format);
const zhNow = moment().locale('zh-cn').utcOffset(8);

const Index = React.createClass({
  getInitialState(){
    return {
      "id":"",
      "name": "",
      "toDay": zhNow,
      "fromDay": zhNow,
      "timeRange": "day",
      "sortBy":'dimName',
      "shopId": "",
      "shopEntityId": "",
      "dimType" : "categoryRoot,shopFloor"
    };
  },
  getDefaultProps(){
    return {
      "toDay": zhNow,
      "fromDay": zhNow,
      "shopId": "",
      "shopEntityId": "",
      "timeRange": "day",
      "dimType" : "categoryRoot,shopFloor"
    };
  },

  componentWillMount(){
    this.props.IndexData.getOrganizations();
  },

  componentDidMount(){

    var item = {};
    item['timeRange'] = this.state.timeRange;
    item['shopId'] = this.state.id;
    item['fromDay'] = this.state.fromDay;
    item['toDay'] = this.state.toDay;
    item['dimType'] = this.state.dimType;

    //this.props.IndexData.getSaleTrend(item);
    //this.props.IndexData.getSumDim(item);

    document.setTitle('Mall经营');
    document.body.style.backgroundColor = '#fff';
  },

  _getOrgId(params){
    var item = {};
        item['timeRange'] = 'day';
        item['shopId'] = params.id;
        item['fromDay'] = gmtNow;
        item['toDay'] = gmtNow;
        item['dimType'] = this.state.dimType;

    if(this.props.currentOrganization.id != params.id){
      this.setState({
        "fromDay":gmtNow,
        "toDay": gmtNow,
        "timeRange": 'day',
        "id": params.id,
        "name": params.name
      });
    }

    //this.props.IndexData.getDailyReport(item);
    //this.props.IndexData.getSaleTrend(item);
    //this.props.IndexData.getSumDim(item);
  },
  _getDate(params){
    var item = this.state;
        item['fromDay'] = moment(params.fromDay).format(format);
        item['toDay'] = moment(params.toDay).format(format);
        item['timeRange'] = params.timeRange;

    this.setState({
      fromDay: moment(params.fromDay).format(format),
      toDay: moment(params.toDay).format(format),
      timeRange: params.timeRange
    });

    this.props.IndexData.getSaleTrend(item);
    this.props.IndexData.getSumDim(item);
  },
  componentWillReceiveProps(nextProps){
    if(this.props.currentOrganization != nextProps.currentOrganization){
      var params = {};
      params['timeRange'] = nextProps.timeRange;
      params['shopId'] = nextProps.currentOrganization.id;
      params['fromDay'] = gmtNow;
      params['toDay'] = gmtNow;
      params['sortBy'] = 'dimName';
      params['reverse'] = 0;
      params['dimType'] = 'categoryRoot,shopFloor';

      this.setState({
        "id": nextProps.currentOrganization.id,
        "name": nextProps.currentOrganization.name
      });

      this.props.IndexData.getDailyReport(params);
      this.props.IndexData.getSaleTrend(params);
      this.props.IndexData.getSumDim(params);
    }
  },
  render() {
    return (
      <div className="mobile-mall-dashboard">
        <MenuOrgAction callback={this._getOrgId} {...this.state}/>
        <DailyReportTop {...this.state}/>
        <WingBlank size="sm">
        <DateLayer callback={this._getDate} {...this.state}/>
          <div className="sale-trend">
            <SaleTrend {...this.state}/>
            <SaleMap {...this.state}/>
          </div>
        <CopyRight/>
        </WingBlank>
      </div>
    );
  }
});

export default createActionContainer({
  currentOrganization:'currentOrganization'
},{
  IndexData
})(Index);
