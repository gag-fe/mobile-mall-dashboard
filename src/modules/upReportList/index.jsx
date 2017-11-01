import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import { Link, hashHistory } from 'react-router';
import { WingBlank, SegmentedControl, DatePicker} from 'antd-mobile';
import RCTable from 'rc-table';
import IndexData from '../../actions/index/index';
import { createForm } from 'rc-form';
import RcPagination from './RcPagination.jsx';
import './css/index.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment().utcOffset(8);
const minDate = moment().subtract(90, 'days').utcOffset(8);

const CustomChildren = props => (
  <div onClick={props.onClick} className="select-date"><span>&lt; </span><lable>{props.children}</lable>{props.extra}<span> &gt;</span></div>
);

const UpReportList = React.createClass({
  getInitialState(){
    return {
      selectedIndex: 0,
      isClaimed: 0,
      shopId: this.props.params.id || '',
      fromDay: this.props.shopListInfo.fromDay || zhNow,
      toDay: this.props.shopListInfo.toDay || zhNow,
      timeRange: 'day',
      reverse: 0,
      pageIndex: this.props.shopListInfo.pageIndex || 1,
      pageSize: 10,
      sortBy: 'shopEntityName',
      scrollY: document.body.clientheight -220,
      total: this.props.claimDetails ? this.props.claimDetails.total :1
    };
  },

  componentDidMount(){
    var params = this.state;
        params['shopId'] = this.props.params.id;
      this.props.setStoreState({
          shopListInfo:params
      });
    this.props.IndexData.getClaimDetails(params);
    document.setTitle(this.props.currentOrganization.name);
    document.body.style.backgroundColor = '#fff';
  },

  _columnsTable(){
    return [{
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: '20%',
    },{
      title: '商家',
      dataIndex: 'shopEntityName',
      key: 'shopEntityName',
      width: '35%',
      render:(text, record) => {
        return (<span className="shop-name" onClick={this._linkListToDatail.bind(this, record)}>{record.shopEntityName}</span>);
      }
    },{
      title: '金额',
      dataIndex: 'claimMoneyTotal',
      key: 'claimMoneyTotal',
      width: '15%',
    },{
      title: '单数',
      dataIndex: 'claimBillTotal',
      key: 'claimBillTotal',
      width: '15%',
    },{
      title: '状态',
      dataIndex: 'isClaimed',
      key: 'isClaimed',
      width: '15%',
      render:(text, record) => {
          if(record && record.isClaimed == 1){
            return (<span style={{color:'#3dbd7d'}}>已上报</span>);
          }else{
            return (<span style={{color:'#f46e65'}}>未上报</span>);
          }
      }
    }]
  },

  _linkListToDatail(record){
    var url = '/detail/' + this.state.shopId +'/'+ record.shopEntityId + '/' + record.shopEntityName + '/' + (record.telephone || '-');
    hashHistory.push(url);
  },

  _handleTableChange(e){
    var value = e.nativeEvent.selectedSegmentIndex;
    var params = this.state;

        params['pageIndex'] = 1;

    if(value == 1){
      params['isClaimed'] = 1;
    }else{
      params['isClaimed'] = 0;
    }

    this.setState({
      selectedIndex: value,
      isClaimed: params['isClaimed'],
      pageIndex: 1
    });
    this.props.setStoreState({
      shopListInfo:params
    });
    this.props.IndexData.getClaimDetails(params);
  },

  _handleTableOnValueChange(val){
    //this.props.IndexData.getClaimDetails(this.state);
  },

  _pageTrun(value){
    var params = this.state;
        params['pageIndex'] = value;

    this.setState({
      pageIndex: value
    });

    var item = params;
    this.props.setStoreState({
      shopListInfo:params
    });
    this.props.IndexData.getClaimDetails(item);
  },
  _getSelectDate(value){
    var item = this.state;
        item['fromDay'] = value;
        item['toDay'] = value;
        item['pageIndex'] = 1;

    this.setState({
      fromDay: value,
      toDay: value,
      pageIndex: 1
    });

    this.props.IndexData.getClaimDetails(item);
  },
  _headerView (){
    return (
      <div className="header-view">
        <ul>
          <li>日期</li>
          <li>商家</li>
          <li>上报金额</li>
          <li>上报单数</li>
          <li>状态</li>
        </ul>
      </div>
    );
  },
  render() {
    const { getFieldProps } = this.props.form;
    var scrollY = window.screen.height -230;
    var pageIndex = this.state.pageIndex;
    var current = pageIndex;
    if(pageIndex >= 1){
      //current = current - 1;
    }
    const PaginationParams = {
      mode:'button',
      current: current,
      total:  Math.ceil(this.props.claimDetails.total / this.state.pageSize) || 1,
      onChange: this._pageTrun,
      prefixCls: 'am-pagination',
      simple: false,
    };


    return (
      <div className="upreport-list">
        <WingBlank size="sm">
          <div className="table-header">
          <SegmentedControl onValueChange={this._handleTableOnValueChange} onChange={this._handleTableChange} selectedIndex={this.state.selectedIndex} values={['未上报', '已上报']} />
            <RCTable columns={this._columnsTable()}></RCTable>
          </div>
        <div className="table-view">


              <RCTable columns={this._columnsTable()} data={this.props.claimDetails?this.props.claimDetails.rows:[]} showHeader={false}></RCTable>
              <RcPagination prevText="上一页" nextText="下一页" {...PaginationParams}/>


        </div>
      </WingBlank>
          <div className="bar-bottom">
          <div className="date-picker">
            <DatePicker
              mode="date"
              title="选择日期"
              onChange={this._getSelectDate}
              value={this.state.toDay}
              {...getFieldProps('date', {
                initialValue: zhNow,
                onChange: this._getSelectDate
              })}
              value={this.state.toDay}
              minDate={minDate}
              maxDate={maxDate}
            >
              <CustomChildren>时间：</CustomChildren>
            </DatePicker>
          </div>
          </div>
      </div>
    );
  }
});
const UpReportListWrapper = createForm()(UpReportList);
export default createActionContainer({
  currentOrganization:'currentOrganization',
  claimDetails: 'claimDetails',
  shopListInfo: 'shopListInfo'
},{
  IndexData
})(UpReportListWrapper);
