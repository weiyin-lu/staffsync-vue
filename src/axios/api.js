import http from "./axios.js";


const api = {}
// 认证模块-系统访问认证
api.login = dto => {
    return http.post("/authorize/sign/login", dto)
}
api.logout = () => {
    return http.get("/authorize/sign/logout")
}
api.register = dto => {
    return http.post("/authorize/sign/register", dto)
}
// 认证模块-认证信息获取
api.isLogin = () => {
    return http.get("/authorize/information/isLogin")
}
// 系统级管理模块-权限系统管理
api.getPermissionListByPage = value => {
    return http.get("/admin/permission/getPermissionList/" + value)
}
api.addPermission = dto => {
    return http.post("/admin/permission/addPermission", dto)
}
// 系统级管理模块-角色系统管理
api.getRoleListByPage = value => {
    return http.get("/admin/role/getRoleList/" + value)
}
api.addRole = dto => {
    return http.post("/admin/role/addRole", dto)
}
api.setRoleByRolId = dto => {
    return http.put("/admin/role/updateRole", dto)
}
api.removeRoleByRoleId = value => {
    return http.delete("/admin/role/removeRole/" + value)
}
export default api