import React from 'react';
import { createContainer, createActionContainer } from 'Roof';
import { WingBlank } from 'antd-mobile';
import './css/index.css';
import CopyRight from '../../components/copy-right/index';
import RCTable from 'rc-table';
import IndexData from '../../actions/index/index';
const telephoneIcon = require('../../img/telephone.png');
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const format = "YYYY-MM-DD";
const gmtNow = moment().format(format);
import Utils from '../../utils/index';
import Permission from '../../components/permission/index';
const Ajax = Utils.ajax;

const API = {
  GET_CLAIMDETAILS: window.APP_CONFIG.urlFix + '/report/mall/getClaimDetails.json' //手机上报商家明细
};
const upReportDetail = React.createClass({
    getInitialState(){
      return {
        "isClaimed": "-1",
        "timeRange": "month",
        "pageIndex": 1,
        "pageSize": 100,
        "sortBy": "date",
        "toDay": gmtNow,
        reverse: 1,
        "fromDay":moment().subtract(30, 'days').format(format),
        "claimDetailsInfo":{
          rows: []
        }
      };
    },
    getDefaultProps(){
      return {
        "toDay": gmtNow,
        "fromDay":moment().subtract(30, 'days').format(format),
        "claimDetailsInfo":{
          rows: []
        }
      };
    },

    _headerHtml(data){
      var telephone = data.telephone;
      if(data.telephone == '-'){
        telephone = '';
      }
      return(
        <div className="detail-header">
          <div className="info">
            <div className="title"><span>商户：</span>{data.shopEntityName}</div>
          <div className="telephone" style={telephone?{display:'block'}:{display:'none'}}><span>电话：</span><a href={"tel:" + telephone}> {telephone}</a></div>
          </div>
        </div>
      );
    },

    _columns(){
      return [{
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        width: '40%',
      },
      {
        title: '上报金额',
        dataIndex: 'claimMoneyTotal',
        key: 'claimMoneyTotal',
        width: '30%',
      },
      {
        title: '上报状态',
        dataIndex: 'isClaimed',
        key: 'isClaimed',
        width: '30%',
        render: (text, record) => {
          if(record.isClaimed == 1){
            return (<span style={{color:'#999'}}>已上报</span>);
          }else{
            return (<span style={{color:'#f04134'}}>未上报</span>);
          }
        }
      }];
    },

    //店铺详情
    _getClaimDetailsInfo(params){
      Ajax({
        url   :API.GET_CLAIMDETAILS,
        data  : params,
        method:'post',
        type  :'json',
      }).then(resp=>{
        if(resp.status=='S'){
          this.setState({
            claimDetailsInfo: resp.data
          });
        }
      }).catch(err=>{
        Permission(err);
      });
    },

    componentDidMount(){
      const params = Object.assign({},this.props.params, this.state);
      this._getClaimDetailsInfo(params);
      document.setTitle(this.props.currentOrganization.name);
      document.body.style.backgroundColor = '#fff';
    },

    render(){
      const scrollY = window.screen.height -180;
      const dataHeader = this.props.params;
      return(
        <div className="upreport-detail">
        <WingBlank size="sm">
          <div className="fixclassname">
            {this._headerHtml(dataHeader)}
            <RCTable columns={this._columns()}/>
          </div>
              <div className="fixclasstable">
            <RCTable
              columns={this._columns()}
              data={this.state.claimDetailsInfo.rows}
              showHeader={false}
            />
              </div>
          <CopyRight/>
        </WingBlank>
        </div>
      );
    }

});

export default createContainer({
  currentOrganization:'currentOrganization',
  claimDetails: 'claimDetails'
},{
  IndexData
})(upReportDetail);
