// axios
import envParams from '@envParams'
import axios from 'axios'
import Vue from 'vue'

// console.log(envParams.BASE_URL)
// console.log(process.env.VUE_APP_SOMEKEY)

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: envParams.BASE_URL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

axiosIns.interceptors.request.use(
  config => {
    // Do something before request is sent

    const accessToken = localStorage.getItem('accessToken')

    // eslint-disable-next-line no-param-reassign
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  error => Promise.reject(error),
)

axiosIns.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userData')
      localStorage.removeItem('userAbility')
    } else {
      Promise.reject(error)
    }
  },
)

Vue.prototype.$http = axiosIns

export default axiosIns
