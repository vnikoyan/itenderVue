import axios from 'axios'
import store from '../store'

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
})

client.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.common.Authorization = 'bearer' + token;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status === 401) {
      store.dispatch('logout')
    }
    return Promise.reject(error.response)
  }
);

export default client
