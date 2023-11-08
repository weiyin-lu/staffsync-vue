import http from "./axios.js";


const api = {}
api.login = (dto) => {
    return http.post("/authorize/sign/login",dto)
}
api.logout = () => {
    return http.post("/authorize/sign/logout")
}
api.register = (dto) => {
    return http.post("/authorize/sign/register",dto)
}
api.isLogin = () => {
    return http.get("/authorize/information/isLogin")
}

export default api