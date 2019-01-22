/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import { client } from './main';
import { GET_ARTICLE, GET_CURRENT_USER } from '../query/queries';
import { SIGNIN_USER } from '../mutation/mutation';
import router from './router';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        articles: [],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        initArticle: (state, payload) => {
            state.articles = payload;
        },
        loading: (state, payload) => {
            state.loading = payload;
        },
        setUser: (state, payload) => {
            state.user = payload;
        },
        error: (state, payload) => {
            state.error = payload;
        },
        clearUser: state => {
            state.user = null;
        }
    },
    actions: {
        getCurrentUser: ({ commit }) => {
            commit('loading', true);
            client
                .query({
                    query: GET_CURRENT_USER
                })
                .then(({ data }) => {
                    console.log(data);
                    commit('setUser', data.currentUser);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        getArticle: ({ commit }) => {
            commit('loading', true);
            client
                .query({
                    query: GET_ARTICLE
                })
                .then(({ data }) => {
                    commit('loading', false);
                    commit('initArticle', data.getArticle);
                    console.log('🍕 Store.getAricle', data.getArticle);
                })
                .catch(err => {
                    console.log('🦂 got Error', err);
                    commit('loading', false);
                });
        },
        signInuser: ({ commit }, payload) => {
            commit('loading', true);
            commit('error', false);
            client
                .mutate({
                    mutation: SIGNIN_USER,
                    variables: payload
                })
                .then(({ data }) => {
                    console.log('SigIn', data);
                    localStorage.setItem('token', data.signinUser.token);
                    router.go();
                })
                .catch(err => {
                    console.log('s', err);
                    commit('error', err);
                });
        }
    },
    getters: {
        articles: state => state.articles,
        loading: state => state.loading,
        user: state => state.user,
        error: state => state.error
    }
});
