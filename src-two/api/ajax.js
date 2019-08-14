//开发使用http://localhost:3000;
// 生产使用http://localhost:5000;
//成功then触发 只需要成功的数据 失败用catch触发

import axios from 'axios';


console.log((process.env.NODE_ENV));

const BASE_URL =process.env.NODE_ENV ==='development'?'http://localhost:3000':'http://localhost:5000';

// axios.create({
//   baseURL:'BASE_URL',
//   timeout:10000,//超时请求超过10m 终止请求
//   //headers:{}
// });


const axisoInstance=axios.create({
  baseURL:BASE_URL,
  timeout:10000,//超时请求超过10m 终止请求
  //headers:{}
});

axisoInstance.interceptors.response.use(
  (response) =>{
    const result = response.data;
    if(result.status === 0){
      return result.data ||{};
    }else{
      return Promise.reject(result.msg || '请求失败~');
    }
  },
  (error) =>{
    //网络错误

    console.log('请求失败',error);
    return  Promise.reject('网络异常，刷新试试');
  }
);

export default axisoInstance