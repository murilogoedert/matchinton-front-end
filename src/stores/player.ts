import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { API_URL, doGet, doGetImage, doPatch, doPost } from './api'
import type { Team } from './team'
import { useUserStore } from './user'

export interface Player {
  id?: number
  name: string
  observation: string
  birth_date: string
  city: string
  state: string
  team_id?: number
  photo?: string
  created_at?: string
  updated_at?: string
  gender: string,
}

export interface PlayerHome {
  player: Player
  details: boolean
}

export const usePlayerStore = defineStore('player', () => {
  function getPlayer(id: string | string[]) {
    return doGet('player/' + id, true)
  }

  async function getAllPlayers(): Promise<AxiosResponse<Player[]>> {
    const userStore = useUserStore()
    return doPost('player/search', { team_id: userStore.getUser().value?.team_id }, true)
  }

  function getPlayerByTeam(id: number | undefined) {
    return doGet('player/team/' + id, true)
  }

  function addPlayer(player: Player) {
    return doPost('player', player, true)
  }

  function updatePlayer(player: Player, teamId: number | undefined) {

    return doPatch(
      'player/' + player.id,
      {
        name: player.name,
        observation: player.observation,
        city: player.city,
        state: player.state,
        team_id: teamId
      },
      true
    )
  }

  function calcAge(dataString: string): number {
    const dataNascimento: Date = new Date(dataString)
    const dataAtual: Date = new Date()

    // Obtem o ano de nascimento e o ano atual
    const anoNascimento: number = dataNascimento.getFullYear()
    const anoAtual: number = dataAtual.getFullYear()

    // Calcula a diferença de anos
    let idade: number = anoAtual - anoNascimento

    // Verifica se o aniversario ja ocorreu neste ano
    const mesAtual: number = dataAtual.getMonth() + 1
    const diaAtual: number = dataAtual.getDate()
    const mesNascimento: number = dataNascimento.getMonth() + 1
    const diaNascimento: number = dataNascimento.getDate()

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
      // Ainda nao fez aniversario neste ano, diminui a idade em 1
      idade--
    }

    return idade
  }

  return {
    addPlayer,
    getPlayer,
    getAllPlayers,
    getPlayerByTeam,
    updatePlayer,
    calcAge
  }
})
