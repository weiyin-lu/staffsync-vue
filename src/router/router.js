import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/authorize/login'
    },
    {
        path: '/authorize',
        redirect: '/authorize',
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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router