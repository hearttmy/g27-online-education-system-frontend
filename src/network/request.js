import axios from 'axios'
import config from '@/common/config'

const http = axios.create({
  baseURL: config.serverBaseUrl,
  withCredentials: true // 允许携带cookie
});

export default http;
