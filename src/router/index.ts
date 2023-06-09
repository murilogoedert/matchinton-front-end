import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import PlayerCrudView from '../views/PlayerCrudView.vue'
import CompetitionCrudView from '../views/CompetitionCrudView.vue'
import HomeView from '../views/HomeView.vue'
import UserView from '@/views/UserView.vue'
import SignUpView from '@/views/SignUpView.vue'
import PlayersView from '@/views/PlayersView.vue'
import CompetitionsView from '@/views/CompetitionsView.vue'
import CreateDuoRequestsView from '@/views/CreateDuoRequestsView.vue'
import DuoRequestsView from '@/views/DuoRequestsView.vue'

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
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    // Rota para tela de lista de jogadores
    {
      path: '/playerList',
      name: 'playerList',
      component: PlayersView
    },
    // Rota para tela de cadastro de jogador
    // Prop opcional id para visualizar um jogador ja cadastrado
    {
      path: '/player/:id?',
      name: 'player',
      component: PlayerCrudView
    },
    // Rota para tela de lista de competicoes
    {
      path: '/competitionList',
      name: 'competitionList',
      component: CompetitionsView
    },
    // Rota para tela de cadastro de competição
    // Prop opcional id para visualizar uma competição ja cadastrado
    {
      path: '/competition/:id?',
      name: 'competition',
      component: CompetitionCrudView
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
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/duo/:player_id',
      name: 'duo_requests',
      component: CreateDuoRequestsView
    },
    {
      path: '/requests',
      name: 'requests',
      component: DuoRequestsView
    }
  ]
})

export default router
