import axios from 'axios'

const http = axios.create({
    baseURL: 'http://127.0.0.1:10000'
})

http.interceptors.request.use(
    config => {
        console.log("普通请求拦截")
        return config
    },
    error => {
        console.log("异常请求拦截")
        return error
    })
http.interceptors.response.use(
    response => {
        console.log("普通响应拦截")
        return response
    },
    error => {
        console.log("异常响应拦截")
        return error
    })

export default http