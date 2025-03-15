import { createRouter, createWebHistory } from 'vue-router'
// import AuthorView from '../views/AuthorView.vue'
// import CategoriaView from '../views/CategoriaView.vue'
// import FotografiaView from '../views/FotografiaView.vue'
// import Home from '../views/Home.vue'
// import GaleriaView from '../views/GaleriaView.vue'

const routes = [
  { path: '/', name: 'Home', component:() => import('../views/Home.vue') },
  { path: '/autores', name: 'Autores', component:() => import('../views/AuthorView.vue')},
  { path: '/categorias', name: 'Categorías',component:() => import('../views/CategoriaView.vue') },
  { path: '/fotografias', name: 'Fotografías', component:() => import('../views/FotografiaView.vue') },
  { path: '/galerias', name: 'Galerías', component:() => import('../views/GaleriaView.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  // Asegúrate de que BASE_URL esté configurado correctamente
  routes
})

export default router
