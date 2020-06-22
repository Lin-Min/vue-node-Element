import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@w/index.vue'
import Register from '@w/register.vue'
import Login from '@w/login.vue'
import NotFound from '@w/404.vue'
import Home from '@w/home.vue'
import Info from '@w/info.vue'
import FoundMoney from '@w/foundMoney.vue';
Vue.use(VueRouter)

const routes = [
  {
  path:	'/',
  name: 'logins',
  redirect: '/login'
  },
  {
  path:	'/index',
  name:	'Index',
  component: Index,
  meta: {
    title: '小民管理系统'
  },
  children: [
    {
      path: '',
      name: 'Homes',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/founds',
      name: 'Found',
      component: FoundMoney
    }
  ]
  },
  {
    path:	'/register',
    name:	'Register',
    component: Register,
    },
    {
      path:	'/login',
      name:	'Login',
      component: Login,
      },
    {
      path:	'*',
      name:	'404',
      component: NotFound,
      }
]

const router = new VueRouter({
  // mode: 'hash',
  mode:'history',
  base: process.env.BASE_URL,
  routes
})

export default router
