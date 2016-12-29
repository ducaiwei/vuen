import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Tap from'./plugins/js/tap'
/* eslint-disable no-new */
import SetList from './components/List'
import Entry from './Entry.vue'
import Index from './view/index.vue'
import ScrollerList from './view/ScrollerList.vue'
const routes = [
  {path:'/',component:Entry},
  {path:'/index',component:Index},
  {path:'/setList',component:SetList},
  {path:'/scrollerList',component:ScrollerList}
]
const router = new VueRouter({
  mode: 'history',
  routes: routes
})
Vue.use(VueRouter);
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
