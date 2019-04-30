import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import Cart from './views/Cart.vue'
// import Category from './views/Category.vue'
// import Profile from './views/Profile.vue'
import Detail from './views/Detail.vue'
import FooterBar from '@/components/footerBar.vue'
let Home = ()=>import('./views/Home.vue')
let Cart = ()=>import('./views/Cart.vue')
let Category = ()=>import('./views/Category.vue')
let Profile = ()=>import('./views/Profile.vue')
let Error = ()=>import('./views/Error.vue')
Vue.use(Router) 

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default:Home,
        'footer-bar':FooterBar
      },
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        default:Cart,
        'footer-bar':FooterBar
      },
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/category',
      name: 'category',
      components:{
        default:Category,
        'footer-bar':FooterBar
      },
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        default:Profile,
        'footer-bar':FooterBar
      },
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },{
      path: '*',
      component:Error
    }

  ]
  
})
