import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

//涉及到非父子组件的通信，所以选择了事件总线 $bus存放
// 1.  Vue.prototype.$bus = new Vue()  2. this.$bus.$emit('事件名称',参数) 3.this.$bus.$on ('事件名称',回调函数(参数))
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),router
}).$mount('#app')
