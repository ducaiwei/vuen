import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Tap from'./plugins/js/tap'
/* eslint-disable no-new */
import SetList from './components/List'
import Entry from './Entry.vue'
import Index from './view/index.vue'
import PullUpLoad from './view/PullUpLoad.vue'
import FullImg from './view/FullImg.vue'
import DateTime from './view/DateTime.vue'

const routes = [
  {path:'/',component:Entry},
  {path:'/index',component:Index},
  {path:'/setList',component:SetList},
  {path:'/pullUpLoad',component:PullUpLoad},
  {path:'/fullImg',component:FullImg},
  {path:'/dateTime',component:DateTime}
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
