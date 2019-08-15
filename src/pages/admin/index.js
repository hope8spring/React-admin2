import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

import data from '../../utils/store';
import { getItem } from '../../utils/storege';
import { reqValidateUser, } from '../../api';

import {message,Spin, Layout, Menu, Breadcrumb } from 'antd';
import logo from '../../assets/images/logo.png';

import LeftNav from '../../component/left-nav/index'

import './index.less';

const { Header, Content, Footer, Sider } = Layout;

export default class Admin extends Component{


  state = {
    isLoading:true,
    collapsed:false,
    idDisplay: "block"

  };

//检测用户是否登录
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

  onCollapse = (collapsed) =>{
    this.setState({
      collapsed,
      idDisplay:collapsed? 'none' : 'block'
    })
  };

  render(){
   // console.log('user', data.user);
    //判断内存有没有数据
    const isLoading=this.checkUserLogin();

    const { idDisplay,collapsed } =this.state;
    if(isLoading) return <Spin tip="Loading..." size='large'/>;


    return<Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <Link to="/home" className="admin-logo" >
          <img src={logo} alt="logo"/>
          <h1 style = {{display:idDisplay}}>硅谷后台</h1>
        </Link>
        <LeftNav/>
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