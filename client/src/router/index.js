import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// Rutas de la página
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
  {
    // Ruta dinámica
    path: '/compra/:id',
    name: 'Compra',
    component: () => import('../views/Compra.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
