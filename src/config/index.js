import api from './api'
import axios from 'axios'
// 配置Axios.defaults.withCredentials = true，这样大部分浏览器都支持跨域cookie了

export const getmessage = (data) => {
  return axios.get(api.getmessage, {params: data})
}
export const gettaokouli = (data) => {
  return axios.get(api.gettaokouli, {params: data})
}
