import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home';
import SignIn from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Article from './components/Articles/AddArticle';
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
        },
        {
            path: '/article/add',
            name: 'article',
            component: Article
        }
    ]
});
