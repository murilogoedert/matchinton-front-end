import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import PlayerCrudView from '../views/PlayerCrudView.vue'
import HomeView from '../views/HomeView.vue'
import UserView from '@/views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rota para tela principal
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // Rota para tela de login
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    // Rota para tela de cadastro de jogador
    {
      path: '/player',
      name: 'player',
      component: PlayerCrudView
    },
    // Rota para tela de cadastro de usuário
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
