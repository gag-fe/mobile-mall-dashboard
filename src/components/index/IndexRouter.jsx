import React from 'react';
import { createContainer, createRootContainer } from 'Roof';
import { Router, Route,IndexRoute, hashHistory }from 'react-router';
//首页
import Index from '../../modules/index/index';
import upReportList from '../../modules/upReportList/index';
import upReportDetail from '../../modules/upReportDetail/index';
//登陆
import Login from '../../modules/login/login';
import Logout from '../../modules/login/logout';
import Register from '../../modules/login/register';
import Question from '../../modules/login/question';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const zhNow = moment().locale('zh-cn').utcOffset(8);
const IndexRouter=React.createClass({
  render(){
    return (
      <Router history={hashHistory}>
        <Route>
          <IndexRoute component={Index}/>
          <Route path="index" component={Index}/>
          <Route path="list/:id" component={upReportList}/>
          <Route path="detail/:shopId/:shopEntityId/:shopEntityName/:telephone" component={upReportDetail}/>
          <Route path="login/in/:targets" component={Login}/>
          <Route path="login/out" component={Logout}/>
          <Route path="login/register/:targets" component={Register}/>
          <Route path="login/question" component={Question}/>
        </Route>
      </Router>
    )
  }
});

export default createRootContainer({
  currentOrganization:{
    "id": "",
    "name": ""
  },
  organizations:[],
  dailyReport:{},
  saleTrend:[],
  sumDim:{},
  loginData: {},
  registerData: {
    "ticket": '',
    "backData": {}
  },
  claimDetails:[],
  claimDetailsInfo: [],
  //invoice/invoicePrice
  invoicePriceSet: {},
  //login/login
  loginData: {},
  //errorCode
  errorCode: -1,
  //login/register
  registerData: {
    "ticket": '',
    "backData": {}
  },
  shopListInfo: {
    shopId: '',
    fromDay: zhNow,
    toDay: zhNow,
    pageIndex: 1
  }
})(IndexRouter);
