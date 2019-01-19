import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home';
import SignIn from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/signin',
            name: 'signin',
            component: SignIn
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        }
    ]
});
