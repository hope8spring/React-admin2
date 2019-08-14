import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';


import data from '../../utils/store';
import { getItem } from '../../utils/storege';

export default class Admin extends Component{

  render(){
   // console.log('user', data.user);
    //判断内存有没有数据
    if(!data.user._id){
      //判断本地有没有数据
     const user = getItem();
     if(!user){
       //内存没有 本地没有 去登录
       return <Redirect to ='/login'/>;
     }
     //内存没有 本地有 存内存
      data.user = user;
    }
    return <div>
      Admin
    </div>
  }
}