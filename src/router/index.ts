import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue') },
  { path: '/autores', name: 'Autores', component: () => import('../views/AuthorView.vue'), meta: { requiresAuth: true }},
  { path: '/categorias', name: 'Categorías', component: () => import('../views/CategoriaView.vue'), meta: { requiresAuth: true }},
  { path: '/fotografias', name: 'Fotografías', component: () => import('../views/FotografiaView.vue'), meta: { requiresAuth: true }},
  { path: '/galerias', name: 'Galerías', component: () => import('../views/GaleriaView.vue'), meta: { requiresAuth: true }},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Middleware de autenticación
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
