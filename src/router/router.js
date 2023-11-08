import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import("/src/components/HelloWorld.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router