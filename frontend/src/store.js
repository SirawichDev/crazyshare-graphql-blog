/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import { gql } from 'apollo-boost';
import { client } from './main';
import { GET_ARTICLE } from '../query/queries';
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
        }
    },
    getters: {
        articles: state => state.articles,
        loading: state => state.loading
    }
});
