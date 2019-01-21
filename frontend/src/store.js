/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import { client } from './main';
import { GET_ARTICLE } from '../query/queries';
import { SIGNIN_USER } from '../mutation/mutation';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        articles: [],
        loading: false
    },
    mutations: {
        initArticle: (state, payload) => {
            state.articles = payload;
        },
        loading: (state, payload) => {
            state.loading = payload;
        }
    },
    actions: {
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
            client
                .mutate({
                    mutation: SIGNIN_USER,
                    variables: payload
                })
                .then(data => {
                    console.log('SigIn', data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    getters: {
        articles: state => state.articles,
        loading: state => state.loading
    }
});
