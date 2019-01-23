/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import { client } from './main';
import { GET_ARTICLE, GET_CURRENT_USER } from '../query/queries';
import { SIGNIN_USER, SIGNUP_USER, ADD_ARTICLE } from '../mutation/mutation';
import router from './router';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        articles: [],
        user: null,
        loading: false,
        error: null,
        authError: null
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
        },
        reAuth: (state, payload) => {
            state.authError = payload;
        },
        signout: state => {
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
            commit('error', null);
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
        },
        signUpuser: async ({ commit }, payload) => {
            localStorage.setItem('token', '');
            client
                .mutate({
                    mutation: SIGNUP_USER,
                    variables: payload
                })
                .then(({ data }) => {
                    localStorage.setItem('token', data.signupUser.token);
                    router.go();
                })
                .catch(err => {
                    commit('error', err);
                });
        },
        signoutUser: async ({ commit }) => {
            commit('signout');
            localStorage.setItem('token', '');
            await client.resetStore();
            router.push('/');
        },
        createArticle: async ({ commit }, payload) => {
            commit('loading', true);
            client
                .mutate({
                    mutation: ADD_ARTICLE,
                    variables: payload,
                    update: (cache, { data: { createArticle } }) => {
                        console.log('cache' + cache, 'data' + data);
                        const data = cache.readQuery({ query: GET_ARTICLE });
                        data.getArticle.unshift(createArticle);
                        console.log('data.getArticle', data.getArticle);
                        cache.writeQuery({
                            query: GET_ARTICLE,
                            data
                        });
                    }
                })
                .then(({ data }) => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    getters: {
        articles: state => state.articles,
        loading: state => state.loading,
        user: state => state.user,
        error: state => state.error,
        authError: state => state.authError
    }
});
