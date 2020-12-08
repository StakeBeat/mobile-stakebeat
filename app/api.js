import axios from 'axios'

const SERVER_URI = "http://192.168.1.92:5000"
export const REGISTER_URL = `${SERVER_URI}/api/register`
export const LOGIN_URL = `${SERVER_URI}/auth`

export const VALIDATORS_URL = `${SERVER_URI}/api/validators`
export const VALIDATORS_INFO_URL = `${SERVER_URI}/api/validators/info`


export const get = (url, headers = {}, config = {}) => axios.get(url, {
  ...config,
  headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...headers },
})

export const post = (url, data, headers = {}, config = {}) => axios.post(url, data, {
  ...config,
  headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...headers },
})

export const put = (url, data, headers = {}, config = {}) => axios.put(url, data, {
  ...config,
  headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...headers },
})

export const del = (url, data, headers = {}, config = {}) => axios.delete(url, {
  headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...headers },
  data,
  ...config,
})

export default { get, post, put, del }
