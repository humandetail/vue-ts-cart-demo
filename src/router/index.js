import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Address from '../views/Address.vue';
Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/address',
        name: 'Address',
        component: Address
    }
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
export default router;
//# sourceMappingURL=index.js.map