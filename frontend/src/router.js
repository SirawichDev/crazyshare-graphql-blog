import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home';
import SignIn from './components/Auth/Signin';
import Profile from './components/Auth/Profile';
import Signup from './components/Auth/Signup';
import AddArticle from './components/Articles/AddArticle';
import ArticleList from './components/Articles/ArticleList';
import Article from './components/Articles/Article';
Vue.use(Router);

export default new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
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
            path: '/profile',
            name: 'Profile',
            component: Profile
        },

        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {
            path: '/article/:articleId',
            name: 'Article',
            component: Article,
            props: true
        },
        {
            path: '/articles/create',
            name: 'AddArticle',
            component: AddArticle
        },
        {
            path: '/article',
            name: 'ArticleList',
            component: ArticleList
        }
    ]
});
