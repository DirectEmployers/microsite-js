import Vue from 'vue'
import LocalDevApp from './LocalDevApp.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(LocalDevApp),
}).$mount('#app')

