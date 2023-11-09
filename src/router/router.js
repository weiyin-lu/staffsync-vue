import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/authorize/login'
    },
    {
        path: '/authorize',
        component: () => import('/src/view/Authorize.vue'),
        children: [
            {
                path: 'login',
                component: () => import('/src/components/authorize/Login.vue')
            },
            {
                path: 'register',
                component: () => import('/src/components/authorize/Register.vue')
            },
        ]
    },
    {
        path: '/index',
        component: () => import('/src/view/Index.vue'),
        redirect: '/index/default',
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
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router