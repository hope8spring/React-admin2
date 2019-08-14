import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

import data from '../../utils/store';
import { getItem } from '../../utils/storege';
import { reqValidateUser, } from '../../api';

import {message,Spin, Layout, Menu, Breadcrumb, Icon } from 'antd';
import logo from '../../assets/images/logo.png';

import './index.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Item } = Menu;




export default class Admin extends Component{


  state = {
    isLoading:true
  };


checkUserLogin=()=>{

  if(!data.user._id){
    //判断本地有没有数据
    const user = getItem();
    if(!user){
      //内存没有 本地没有 去登录
      return this.props.history.replace('./login')
    }
    reqValidateUser(user._id)
      .then(()=>{
          data.user = user;
          this.setState({
            isLoading:false
          })
      })
     .catch(()=>{
      message.error('请先登录',3);
      this.props.history.replace('./login');
    });
    return true
  }else{
    return false;
  }
};
  render(){
   // console.log('user', data.user);
    //判断内存有没有数据
    const isLoading=this.checkUserLogin();
    if(isLoading) return <Spin tip="Loading..." size='large'/>;

    const path = this.props.location.pathname;

    return<Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Link to="/home" className="admin-logo" >
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>
        <Menu theme="dark" defaultSelectedKeys={[path]} mode="inline">
          <Item key="/home">
            <Link to="/home">
             <Icon type="home" />
            <span>首页</span>
            </Link>
          </Item>
          <SubMenu
            key="2"
            title={
              <span>
                  <Icon type="appstore" />
                  <span>商品</span>
                </span>
            }
          >
            <Item key="/category">
              <Link to="/category">
              <Icon type="bars" />
              <span>品类管理</span>
              </Link>
            </Item>
            <Item key="/product">
              <Link to="/product">
              <Icon type="tool" />
              <span>商品管理</span>
              </Link>
            </Item>
          </SubMenu>
          <Item key="/user">
            <Link to="/user">
            <Icon type="user" />
            <span>用户管理</span>
            </Link>
          </Item>
          <Item key="/role">
            <Link to="/role">
              <Icon type="safety" />
              <span>权限管理</span>
            </Link>
          </Item>
          <SubMenu
            key="5"
            title={
              <span>
                  <Icon type="area-chart" />
                  <span>图形图表</span>
                </span>
            }
          >
            <Item key="/chart-bar">
              <Link to="/chart-bar">
                <Icon type="bar-chart" />
                <span>柱形图</span>
              </Link>
            </Item>
            <Item key="/chart-line">
              <Link to="/chart-line">
                <Icon type="line-chart" />
                <span>折线图</span>
              </Link>
            </Item>
            <Item key="/chart-pie">
              <Link to="/chart-pie">
                <Icon type="pie-chart" />
                <span>饼图</span>
              </Link>
            </Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  }
}