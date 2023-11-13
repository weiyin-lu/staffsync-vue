import {createRouter, createWebHistory} from "vue-router";
import api from "../axios/api.js";
import {ElMessage} from "element-plus";

const routes = [
    {
        path: '/',
        redirect: '/sign/login'
    },
    {
        path: '/sign',
        component: () => import('/src/view/Authorize.vue'),
        children: [
            {
                path: 'login',
                component: () => import('/src/components/sign/Login.vue')
            },
            {
                path: 'register',
                component: () => import('/src/components/sign/Register.vue')
            },
        ]
    },
    {
        path: '/index',
        component: () => import('/src/view/Index.vue'),
        redirect: '/index/default',
        beforeEnter: (to, from, next) => {
            api.isLogin()
                .then(r => {
                    if (r) {
                        next()
                    } else {
                        next("/")
                    }
                })
        },
        children: [
            {
                path: 'default',
                component: () => import('/src/components/Information.vue')
            },
            {
                path: 'system-deptConfig',
                component: () => import('/src/components/system/DeptConfig.vue')
            },
            {
                path: 'system-roleConfig',
                component: () => import('/src/components/system/RoleConfig.vue')
            },
            {
                path: 'system-permissionConfig',
                component: () => import('/src/components/system/PermissionConfig.vue')
            },
            {
                path: 'system-menuConfig',
                component: () => import('/src/components/system/MenuConfig.vue')
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router