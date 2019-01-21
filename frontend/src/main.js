/* eslint-disable no-console */
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
Vue.use(VueApollo);

export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        if (!localStorage.token) {
            localStorage.setItem('token', '');
        }
        operation.setContext({
            headers: {
                authorization: localStorage.getItem('token')
            }
        });
    },
    onError: ({ graphqlError, networkError }) => {
        if (networkError) {
            console.log('[Problem from network]', networkError);
        }
        if (graphqlError) {
            for (let err of graphqlError) {
                console.dir('graph Error', err);
            }
        }
    }
});
const apolloProvider = new VueApollo({ defaultClient: client });

Vue.config.productionTip = false;

new Vue({
    provide: apolloProvider.provide(),
    router,
    store,
    render: h => h(App)
}).$mount('#app');
