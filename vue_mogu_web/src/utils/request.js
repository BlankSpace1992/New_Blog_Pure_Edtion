import axios from 'axios'
import router from '@/router/index'
import {getCookie} from "@/utils/cookieUtils";
// 创建axios实例
const service = axios.create({
  baseURL: '', // api 的 base_url
  timeout: 50000 // 请求超时时间 10秒
})

service.defaults.headers.common['Authorization'] = getCookie("token")

// request拦截器
service.interceptors.request.use(
  config => {
    if (getCookie("token") != undefined) {
      config.headers.Authorization = getCookie("token") // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)


// response 拦截器
service.interceptors.response.use(
  response => {
    // return response.result
    const res = response;
    if (res.status === 200) {
      return res
    } else if (res.status === 401 || res.status === 400) {
      console.log('返回错误内容', res)
      router.push('404')
      return res
    } else if (res.status === 500) {
      router.push('500')
      return Promise.reject('error')
    } else if (res.status === 502) {
      router.push('502')
      return Promise.reject('error')
    } else {
      return Promise.reject('error')
    }
  },
  error => {
    // 出现网络超时
    router.push('500')
    return Promise.reject(error)
  }
)

export default service
