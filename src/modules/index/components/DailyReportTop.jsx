import { createContainer, createRootContainer, createActionContainer } from 'Roof';
import React from 'react';
import { Link, hashHistory } from 'react-router';
import IndexData from '../../../actions/index/index';
import { WingBlank } from 'antd-mobile';
import '../css/index.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const format = "YYYY-MM-DD";
const gmtNow = moment().format(format);
const zhNow = moment().locale('zh-cn').utcOffset(8);

const DailyReportTop = React.createClass({
  /*
  propTypes: {
    "saleAmount": React.PropTypes.number,
    "claimBillTotal": React.PropTypes.number,
    "claimMoneyTotal": React.PropTypes.number,
    "shopEntityCount": React.PropTypes.number
  },
  */
  getInitialState(){
    return {
      id:this.props.id,
      dailyReport: {}
    };
  },

  _linkTolist(){
    var item = {
      shopId: this.state.id,
      fromDay: zhNow,
      toDay: zhNow,
      pageIndex: 1
    };

    this.props.setStoreState({
      shopListInfo: Object.assign({},item)
    });

    var url = '/list/' + this.state.id;
    hashHistory.push(url);
  },

  componentWillReceiveProps(nextProps){
    //console.log(nextProps.id);
    if(this.props.dailyReport != nextProps.dailyReport){
      this.setState({
        id:nextProps.id,
        dailyReport: nextProps.dailyReport
      });
    }
  },

  render(){
    return (
      <div className="daily-report">
        <div className="up-report" onClick={this._linkTolist}>接入商户数：{this.state.dailyReport.shopEntityCount} (上报总金额：{this.state.dailyReport.claimMoneyTotal}元)</div>
        <WingBlank size="sm">
        <div className="sale-report">
          <p className="title"><h2>实时销售额</h2> <span>（元）</span></p>
          <p className="sale-amount">{this.state.dailyReport.saleAmount}</p>
        </div>
        </WingBlank>
      </div>
    );
  }
});


export default createActionContainer({
  dailyReport:'dailyReport',
  shopListInfo: 'shopListInfo'
},{
  IndexData
})(DailyReportTop);
