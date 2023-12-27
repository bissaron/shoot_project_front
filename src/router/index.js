import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import UserListView from '../views/UserListView.vue'
import UserAddView from '../views/UserAddView.vue'
import GunListView from '../views/GunListView.vue'
import GunAddView from '../views/GunAddView.vue'
import RangeListView from '../views/RangeListView.vue'
import RangeAddView from '../views/RangeAddView.vue'
import ReserveDetailView from '../views/ReserveDetailView.vue'
import ReserveListView from '../views/ReserveListView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  },
  {
    path: '/user',
    name: 'user',
    component: UserListView
  },
  {
    path: '/user/add',
    name: 'adduser',
    component: UserAddView
  },
  {
    path: '/gun',
    name: 'gun',
    component: GunListView
  },
  {
    path: '/gun/add',
    name: 'addgun',
    component: GunAddView
  },
  {
    path: '/range',
    name: 'range',
    component: RangeListView
  },
  {
    path: '/range/add',
    name: 'addrange',
    component: RangeAddView
  },
  {
    path: '/reservedata',
    name: 'reservedata',
    component: ReserveDetailView
  },
  {
    path: '/reserve',
    name: 'reserve',
    component: ReserveListView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router