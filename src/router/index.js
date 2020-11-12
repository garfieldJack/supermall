import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const home = () => import('../views/home/Home')

const profile = () => import('../views/profile/Profile')

const cart = () => import('../views/cart/Cart')

const category = () => import('../views/category/Category')

const detail = () => import('../views/detail/Detail')
//安装插件
Vue.use(VueRouter)

//创建router
const routes = [
    {
        path: '',
        redirect: '/home'
      },
      {
       path: '/home',
       component: home
     },
     {
       path: '/profile',
       component: profile
     },
     {
       path: '/cart',
       component: cart
     },
     {
       path: '/category',
       component: category
     },
     {
      path: '/detail/:iid',
      component: detail
    },
]
const router = new VueRouter({
    routes,
    mode: 'history'
    })

//导出
export default router
