import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
Vue.prototype.axios = axios;
import '@/assets/css/reset.css'
import '@/mock/mock.js'
import {
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,SwitchCell,Checkbox,Dialog, SubmitBar,Switch,Button, NavBar, Card, Stepper, Icon, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, Tab, Tabs, Field, CellGroup, Toast, Row, Col, List, PullRefresh
} from 'vant'
Vue.use(GoodsAction)
  .use(GoodsActionBigBtn)
  .use(GoodsActionMiniBtn).use(SubmitBar).use(Checkbox).use(Dialog).use(SwitchCell).use(Switch).use(PullRefresh).use(Card).use(Stepper).use(Button).use(NavBar).use(Icon).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Lazyload).use(Tab).use(Tabs).use(Field).use(CellGroup).use(Toast).use(Row).use(Col).use(List)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
