import Vue from 'vue'

import App from './App.vue'
import WCharts from '../src'

Vue.use(WCharts)

new Vue({
    render: h => h(App),
}).$mount('#app')
