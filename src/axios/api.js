import http from "./axios.js";


const api = {}
api.isLogin = () => {
    return http.get("/authorize/information/isLogin")
}

export default api