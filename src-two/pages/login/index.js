import React,{ Component } from 'react';
import {Form,Input,Icon,Button,message} from 'antd';
//import { Router } from 'react-router-dom';

import logo from './logo.png';
import { reqLogin } from '../../api';
import data from '../../utils/store';
import { setItem } from '../../utils/storege';

import './index.less';

const Item = Form.Item;


class Login extends Component{


   validator = (rule,value,callback)=>{
     console.log(rule,value);
     const name = rule.field === 'username'?'用户名':'密码';

     const passWordReg = /^\w+$/;
    if(!value){
      callback('输入的内容不能为空');
    }else if(value.length<4){
      callback(`${name}长度必须大于4位`);
    }else if(value.length>10){
      callback(`${name}长度必须大于10位`);
    }else if(!passWordReg.test(value)){
      callback(`${name}用户名只能包含字母，数字，下划线`);
    }

     callback();
   };

   login =(e) =>{
     e.preventDefault();
     this.props.form.validateFields((err,values) =>{
       if(!err){
         const {username,password}=values;
         reqLogin(username,password)
           .then((response)=>{
             // const result = response.data;
             // if(result.state ===0){
             //   message.success('登录成功',3)
             // }else{
             //   message.error(result.msg,3);
             // }
             console.log(response);
             message.success('登录成功',3);

             //存储登录数据
             data.user = response;
             //本地

             setItem(response);


             this.props.history.replace('/');

           })
           .catch((error)=>{
             message.error(error,3);
             this.props.form.resetFields(['password']);

           })
         }
     })
   };
  render(){
    const { getFieldDecorator } = this.props.form;

    return <div className='login'>
      <header className='login-header'>
        <img src={logo} alt="log"/>
        <h1> React项目：后台管理系统</h1>
      </header>
      <section className='login-section'>
          <h2>用户登录</h2>
          <Form onSubmit={this.login}>
            <Item>
             {/* {
                getFieldDecorator(
                  'username',
                  {
                    rules:[
                      {required:true,message:'请输入用户名'},
                      {min:4,message:'用户名必须大于4位'},
                      {pattern:/^\w+$/, message:'用户名只能包含字母，数字，下划线'},

                    ]
                  }
                )(
                  <Input prefix={<Icon type="user" />} placeholder='用户名'/>
                )
              }*/}
              {
                getFieldDecorator(
                  'username',
                  {
                    rules:[
                      {validator:this.validator}
                    ]
                  }
                )(
                  <Input prefix={<Icon type="user" />} placeholder='用户名'/>
                )
              }
            </Item>
            <Item>
              {
                getFieldDecorator(
                  'password',
                  {
                    rules:[
                      {validator:this.validator}
                    ]
                  }
                )(
                  <Input prefix={<Icon type="lock" />} placeholder='密码'/>
                )
              }
            </Item>
            <Item>
              <Button type='primary' htmlType='submit' className='login-btn'>登录</Button>
            </Item>
          </Form>
      </section>
    </div>
  }
}
const newLogin = Form.create()(Login);
export default newLogin;