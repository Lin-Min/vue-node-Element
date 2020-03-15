import axios from 'axios';
import { Message, Loading } from 'element-ui';
import router from '@/router';

let loading
function startLoading(){
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,.7)'
  });
}


function endLoading(){
  loading.close()
}
// 请求拦截
axios.interceptors.request.use(config => {
  const token = localStorage.getItem("leToken");
// 加载动画
startLoading()
if (token) 
  config.headers['Authorization'] = token
return config;
},error => {
return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(response => {
// 关闭动画
endLoading()
return response;
},error => {
  endLoading()
  Message.error(error.response.data)

  const { status } = error.response
  if (status === 401) {
    Message.error('token值无效, 请重新登录')
    localStorage.removeItem('leToken')

    router.push('/login')
  }
return Promise.reject(error);
});

export default axios