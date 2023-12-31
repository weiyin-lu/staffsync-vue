import http from "./axios.js";


const api = {}
// 认证模块-系统访问认证
api.login = dto => {
    return http.post("/authorizes/signs/login", dto)
}
api.logout = () => {
    return http.get("/authorizes/signs/logout")
}
api.register = dto => {
    return http.post("/authorizes/signs/register", dto)
}
// 认证模块-认证信息获取
api.isLogin = () => {
    return http.get("/authorizes/informations/isLogin")
}
api.getRoleListByUserId = value => {
    return http.get("/authorizes/informations/getroleList/" + value)
}
api.getPermissionListByUserId = value => {
    return http.get("/authorizes/informations/getPermissionList/" + value)
}
api.getMenuListByUserId = value => {
    return http.get("/authorizes/informations/getMenuList/" + value)
}
// 系统级管理模块-权限信息配置
api.getPermissionListByPage = value => {
    return http.get("/admins/permissions/getPermissionList/" + value)
}
api.addPermission = dto => {
    return http.post("/admins/permissions/addPermission", dto)
}
api.getPermissionListByCondition = dto => {
    return http.post("/admins/permissions/getPermissionList", dto)
}
// 系统配置管理模块-角色信息配置
api.getRoleListByPage = value => {
    return http.get("/admins/roles/getRoleList/" + value)
}
api.getRoleListByCondition = dto => {
    return http.post("/admins/roles/getRoleList", dto)
}
api.addRole = dto => {
    return http.post("/admins/roles/addRole", dto)
}
api.setRoleByRoleId = dto => {
    return http.put("/admins/roles/setRole", dto)
}
api.removeRoleByRoleId = value => {
    return http.delete("/admins/roles/removeRole/" + value)
}
// 系统配置管理模块-部门信息配置
api.getDeptListByPage = value => {
    return http.get("/admins/departments/getDeptList/" + value)
}
api.getDeptListByCondition = dto => {
    return http.post("/admins/departments/getDeptList", dto)
}
api.addDept = dto => {
    return http.post("/admins/departments/addDept", dto)
}
api.setDeptByCode = dto => {
    return http.put("/admins/departments/setDept", dto)
}
api.removeDeptByDeptCode = value => {
    return http.delete("/admins/departments/removeDept/" + value)
}
// 系统配置管理模块-菜单信息配置
api.getMenuListByPage = value => {
    return http.get("/admins/menus/getMenuList/" + value)
}
api.getMenuListByCondition = dto => {
    return http.post("/admins/menus/getMenuList", dto)
}
api.addMenu = dto => {
    return http.post("/admins/menus/addMenu", dto)
}
api.removeMenuByMenuId = value => {
    return http.delete("/admins/menus/removeMenu/" + value)
}
api.setMenuByMenuId = dto => {
    return http.put("/admins/menus/setMenu", dto)
}
// 系统配置管理模块-角色权限关系配置
api.getPermissionListByRoleId = value => {
    return http.get("/admins/relevances/permission/getPermissionList/" + value)
}
api.getPermissionListAll = () => {
    return http.get("/admins/relevances/permission/getPermissionList")
}
api.addPermissionForRole = dto => {
    return http.post("/admins/relevances/permission/addPermission", dto)
}
api.removePermissionForRole = dto => {
    return http.put("/admins/relevances/permission/removePermission", dto)
}
// 系统配置管理模块-角色菜单关系配置
api.getMenuListByRoleId = value => {
    return http.get("/admins/relevances/menu/getMenuList/" + value)
}
api.getMenuListAll = () => {
    return http.get("/admins/relevances/menu/getMenuList")
}
api.addMenuForRole = dto => {
    return http.post("/admins/relevances/menu/addMenu", dto)
}
api.removeMenuForRole = dto => {
    return http.put("/admins/relevances/menu/removeMenu", dto)
}
// 人员管理模块-部门管理
api.getDeptListForTree = value => {
    return http.get("/department/getDeptList/" + value)
}
// 人员管理模块-个人信息维护
api.setInfoByUserId = dto => {
    return http.put("/infomation/setInfo", dto)
}
export default api