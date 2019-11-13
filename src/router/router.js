import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/Login.vue'
import SignUp from '../components/login/SignUp.vue'
import Forum from '../components/forum/Forum'
import Logout from "../components/login/Logout";


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/forum',
            name: 'Forum',
            component: Forum
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout
        }
    ]
})
