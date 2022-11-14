import { createRouter, createWebHistory } from "vue-router";

const routes = [{ path: "/", component: ()=> import('../features/authentication/views/SignIn.vue') }];

export default createRouter({
    history: createWebHistory(),
    routes
})