/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import { gql } from 'apollo-boost';
import { client } from './main';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        getArticle: () => {
            client
                .query({
                    query: gql`
                        query {
                            getArticle {
                                _id
                                title
                                description
                                imageUrl
                            }
                        }
                    `
                })
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
});
