import axios from 'axios'
import config from '@/common/config'

const http = axios.create({
  baseURL: config.serverApiUrl,

});

export default http;
