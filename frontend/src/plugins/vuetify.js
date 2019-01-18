import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
    iconfont: 'md',
    theme: {
        primary: '#E93148',
        secondary: '#cddc39',
        accent: '#009688',
        error: '#e91e63',
        warning: '#ffeb3b',
        info: '#2196f3',
        success: '#ff5722'
    }
});
