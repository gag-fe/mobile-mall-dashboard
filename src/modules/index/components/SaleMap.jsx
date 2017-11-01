import { createContainer, createRootContainer, createActionContainer } from 'Roof';
import React from 'react';
import Chart from 'rc-echarts';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const format = "YYYY-MM-DD";
const gmtNow = moment().format(format);
const zhNow = moment().locale('zh-cn').utcOffset(8);
import { Button, NavBar, Icon, Menu, ActivityIndicator, WingBlank, SegmentedControl, Table} from 'antd-mobile';
import IndexData from '../../../actions/index/index';
import '../css/index.less';
var TimeRange = 'day';
const chartsOptionsPie = {
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    data:[],
    orient: 'vertical',
    left: 'left'
  },
  toolbox: {
    show : false
  },
  calculable : true,
  series :[
    {
      name: '业态',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:[],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

let comparedAmountRate = [];
const SaleMap = React.createClass({
  getInitialState(){
    return {
      selectedIndex: 0,
      selectedType: 'categoryRoot',
      selectedName: '业态',
      currentStyle: 'current-style',
      timeRange:'day',
      sortBy:'dimName',
      reverse: 0,
      sumDim: []
    };
  },

  _getsumDimCharts(){
    var options = Object.assign({}, chartsOptionsPie);
    var params = this.state;
    var data =  this.props.sumDim[this.state.selectedType] || [];
    var seriesData = [];
    var name = [];
    var legendVisble = true;
    data.map(item => {
      name.push(item.dimName);
      var temp = {};
      temp['name'] = item.dimName;
      temp['value'] = item.amount;

      seriesData.push(temp);
    });
    options['series'][0]['data'] = seriesData;
    options['series'][0]['name'] = params['selectedName'];
    options['legend']['data'] = name;
    if(name.length > 9){
      legendVisble = false;
    }
    return {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        data:name,
        orient: 'horizontal',
        show:legendVisble
      },
      toolbox: {
        show : false
      },
      calculable : true,
      series :[
        {
          name: params['selectedName'],
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  },

  _getSaleTrendData(data){
    var date = [];
    var timeRange = this.props.timeRange;
    var typeTime = '时';
    TimeRange = this.props.timeRange;
    if(moment(this.props.toDay).valueOf() - moment(this.props.fromDay).valueOf() > 100*1000*60*60*24 ){
      typeTime = '月';
    }else{
      if(timeRange == 'day'){
        typeTime = '时';
      }else if(timeRange == 'week'){
        typeTime = '天';
      }else if(timeRange == 'month'){
        typeTime = '天';
      }else{
        typeTime = '天';
      }
    }

    var seriesData = {
      name:'本期',
      type:'line',
      //stack: null,
      areaStyle: {normal: {}},
      data:[]
    };
    var seriesConfig = [];
    var legendData = ['本期', '上期'];

    if(TimeRange == 'range'){
      legendData = ['本期'];
    }else {
      legendData = ['本期', '上期'];
    }

    var chartDateSale = [];
    var chartDateSaleCompare = [];
    var week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    comparedAmountRate = [];
    data.map((item, idx) => {
      if(timeRange == 'week'){
        date.push(week[idx]);
      }else{
        date.push(item.date);
      }


      if(TimeRange == 'range'){
        chartDateSale.push(item.saleAmount);
      }else {
        chartDateSale.push(item.saleAmount);
        chartDateSaleCompare.push(item.comparedAmount);
      }

      comparedAmountRate.push(formatCurrency(item.comparedAmountRate*100));
    });

    legendData.map(item => {
      var tempObj = Object.assign({}, seriesData);
      tempObj['name'] = item;
      //tempObj['stack'] = '销售额';
      if(item == '本期'){
        tempObj['data'] = chartDateSale
      }else{
        tempObj['data'] = chartDateSaleCompare
      }
      seriesConfig.push(tempObj);
    });

    return {
      tooltip : {
        trigger: 'axis',
        //formatter: '{b0}<br />{a0}: {c0}<br />{a1}: {c1}'
        formatter: function(params, ticket, callback){
          var rate = comparedAmountRate[params[0].dataIndex];
          var html;

          if(TimeRange == 'range'){
            html =  params[0].name + '<br />' + params[0].seriesName + ': ' + params[0].data;
          }else{
            if(params.length == 2){
              html =  params[0].name + '<br />' + params[0].seriesName + ': ' + params[0].data + '<br />' + params[1].seriesName + ': ' + params[1].data + '</br> 环比增长: ' + rate + '%';
            }else{
              html =  params[0].name + '<br />' + params[0].seriesName + ': ' + params[0].data;
            }

          }

          return html;
        }
      },
      legend: {
        data: legendData
      },
      toolbox: {
        saveAsImage:{
          show: false,
          feature:{
            show: false
          }
        }
      },
      grid: {
        left: '6%',
        right: '16%',
        bottom: '3%',
        containLabel: true,
        backgroundColor: '#000'
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : date,
          name : typeTime,
          splitNumber: 5,
          minInterval: 1,
          nameLocation: 'end'
        }
      ],
      yAxis : [
        {
          type : 'value',
          name : '销售额（元）',
          splitNumber: 5,
          minInterval: 1,
          nameLocation: 'end'
        }
      ],
      series : seriesConfig
    };
  },
  _columnsFloor(){
    return [{
      title: '楼层',
      dataIndex: 'dimName',
      key: 'dimName'
    },{
      title: '销售额(元)',
      dataIndex: 'amount',
      key: 'amount'
    },{
      title: '销售额占比',
      dataIndex: 'amountPercent',
      key: 'amountPercent',
      render:(text, record) => {
        if(record && record.amountPercent){
          var val = formatCurrency(record.amountPercent*100);
          return val + '%';
        }else{
          return 0
        }
      }
    }]
  },

  _columnsIndustry(){
    return [{
      title: '业态',
      dataIndex: 'dimName',
      key: 'dimName'
    },{
      title: '销售额(元)',
      dataIndex: 'amount',
      key: 'amount'
    },{
      title: '销售额占比',
      dataIndex: 'amountPercent',
      key: 'amountPercent',
      render:(text, record) => {
        if(record && record.amountPercent){
          var val = formatCurrency(record.amountPercent*100);
          return val + '%';
        }else{
          return 0
        }
      }
    }]
  },
  _chartsReadyLine(chart){

  },
  _chartsReadyPie(chart){

  },
  _handleTableChange(e){
    var type = "categoryRoot";
    var currentStyle = 'current-style';
    if(e.nativeEvent.selectedSegmentIndex == 1){
      type = "shopFloor";
      currentStyle = "";
    }
    this.setState({
      selectedIndex: e.nativeEvent.selectedSegmentIndex,
      selectedType: type,
      currentStyle: currentStyle
    });
  },
  _handleTableOnValueChange(val){
    this.setState({
      selectedName: val
    });
  },
  _getTableDataView(){
    var params = this.state;
    var data =  this.props.sumDim[this.state.selectedType] || [];
    return data;
  },
  _getTableColumns(){
    var params = this.state;
    var columns = [];
    if(params['selectedIndex'] == 1){
      columns = this._columnsFloor();
    }else{
      columns = this._columnsIndustry();
    }
    return columns;
  },

  componentWillReceiveProps(nextProps){
    if (this.props.sumDim != nextProps.sumDim) {
      this.setState({
        sumDim: nextProps.sumDim
      });
    }
  },

  render(){
    if(this.state.sumDim.length == 0){
      return false;
    }
    var newChartsOptionsPie = this._getsumDimCharts(this.state.sumDim);
    var newTableData = this._getTableDataView(this.state.sumDim);
    var newTableColumns = this._getTableColumns();


    return (<div>
        <div><h2>销售额分布</h2></div>
        <div>
          <SegmentedControl style={{color:"#333"}} onValueChange={this._handleTableOnValueChange} onChange={this._handleTableChange} selectedIndex={this.state.selectedIndex} values={['业态', '楼层']} />
          <div className={this.state.currentStyle}>
            <Chart options={newChartsOptionsPie} onReady={this._chartsReadyPie}></Chart>
            <Table columns={newTableColumns} dataSource={newTableData}></Table>
          </div>
        </div>
      </div>
    );
  }
});

export default createActionContainer({
  sumDim:'sumDim'
},{
  IndexData
})(SaleMap);
