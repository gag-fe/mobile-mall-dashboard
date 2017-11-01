import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import { Drawer, List, Toast} from 'antd-mobile';
import '../css/index.less';
import IndexData from '../../../actions/index/index';
import moment from 'moment';
import Store from 'store2';
moment.locale('zh-cn');
const Formatter = 'LLLL';
const Item = List.Item;
const BODYNODE = document.getElementsByTagName('body')[0];

const MenuOrgAction = React.createClass({
  getInitialState(){
    return{
      open: false,
      position: 'left',
      name: this.props.currentOrganization.name || '',
      id: this.props.currentOrganization.id || '',
      minHeight: '60'
    };
  },

  _onOpenChange(args){
    var minHeight = '60';
    if(!this.state.open){
      minHeight = BODYNODE.clientHeight;
    }

    this.setState({
      open: !this.state.open,
      minHeight: minHeight
    });
  },

  _getOrgInfo(params, event){
    event.preventDefault();

    if(params.isEmpty == 1){
      Toast.info('机构无数据',1);
      return false;
    }

    var item = this.state;
        item['name'] = params.name;
        item['id'] = params.id;

    this.setState({
      open: false,
      name: params.name,
      id: params.id,
      minHeight: '60',
    });

    this.props.setStoreState({
      currentOrganization: item
    });

    Store.set('currentOrganization', item);

    this.props.callback(item);
  },

  _htmlTree(){
    const treeData =  this.props.organizations || [];
    const list = [];
      treeData.map((item, idx) => {
        if(item.children && item.children.length > 0){
          var children01 = [];
          item.children.map(list =>{
            if(list.children && list.children.length > 0){
              var children02 = [];
              list.children.map(list02 => {
                if(list02.children && list02.children.length > 0){
                  var children03 = [];
                  list02.children.map((list03,idx) => {
                    children03.push(
                      <Item className={list03.isEmpty?'':'available'} onClick={this._getOrgInfo.bind(this,list03)} key={list03.id}>
                        {list03.name}
                      </Item>
                    );
                  });
                  children02.push(
                    <Item key={list02.id}>
                      <ul>
                        <li>
                          <span className={list02.isEmpty?'':'available'} onClick={this._getOrgInfo.bind(this,list02)}>{list02.name}</span>
                          <ul className="leaf">
                            <li>{children03}</li>
                          </ul>
                        </li>
                      </ul>
                      </Item>
                    );
                }else{
                  children02.push(
                    <Item className={list02.isEmpty?'':'available'} onClick={this._getOrgInfo.bind(this,list02)} key={list02.id}>{list02.name}</Item>
                  );
                }
              });
              children01.push(
                <Item key={list.id}>
                  <ul>
                    <li>
                      <span className={list.isEmpty?'':'available'} onClick={this._getOrgInfo.bind(this,list)}>{list.name}</span>
                      <ul>
                        <li>{children02}</li>
                      </ul>
                    </li>
                  </ul>
                </Item>
                );
            }else{
              children01.push(
                <Item className={list.isEmpty?'':'available'} onClick={this._getOrgInfo.bind(this,list)} key={list.id}>{list.name}</Item>
              );
            }
          });
          list.push(
            <Item key={item.id}>
              <ul>
                <li>
                  <span className={item.isEmpty?'':'available'} onClick={this._getOrgInfo.bind(this,item)}>{item.name}</span>
                  <ul>
                    <li>{children01}</li>
                  </ul>
                </li>
              </ul>
            </Item>);
        }else{
          list.push(
            <Item className={item.isEmpty?'pdl20 linebot':'pdl20 linebot available'} onClick={this._getOrgInfo.bind(this,item)} key={item.id}>{item.name}</Item>
          );
        }
      });

      return (<List className="org-list">{list}</List>);
  },

  render() {
    const orgName = this.state.name || this.props.currentOrganization.name;
    const orgId = this.state.id || this.props.currentOrganization.id;
    const sidebar = this._htmlTree();

    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this._onOpenChange
    };

    if(this.state.open){
      BODYNODE.setAttribute('style','overflow:hidden;background:#fff;position:fixed;');
    }else{
      BODYNODE.setAttribute('style','overflow:auto;background:#fff;position:relative;');
    }

    return (
        <Drawer
        className="org-drawer"
        style={{ height: this.state.minHeight }}
        sidebar={sidebar}
        dragHandleStyle={{ display: 'none' }}
        contentStyle={{ color: '#FFF', textAlign: 'center', paddingTop: 10, paddingBottom: 10, background:'#fc6121'}}
        {...drawerProps}
      >
        <div className="orgTitle"><span onClick={this._onOpenChange}>{orgName} <i id="triangle-bottomright"></i></span></div>
        <div className="orgTitme"><span>{moment().format(Formatter)}</span> <span></span>更新</div>
      </Drawer>
    );
  }
});

export default createActionContainer({
  currentOrganization:'currentOrganization',
  organizations:'organizations'
},{
  IndexData
})(MenuOrgAction);
