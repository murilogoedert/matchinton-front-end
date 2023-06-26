import { defineStore } from 'pinia'
import { doGet, doPatch, doPost } from './api'
import type { Competition } from './competition'
import type { Player } from './player'

export interface DuoRequest {
  id?: number
  player1: number
  player2: number
  competition: number
  status?: string
  player_origin?: Player
  player_target?: Player
}

export interface DuoRequestResponse {
  id: number
  competition: Competition
  status?: string
  player_origin?: Player
  player_target?: Player
}

export interface DuoRequestUpdate {
  id: number
  player_id: number
  status: string
}

export const useDuoRequestStore = defineStore('duoRequestStore', () => {
  function createDuoRequest(duoRequest: DuoRequest) {
    return doPost('duo-request', duoRequest, true)
  }

  function getAllDuoRequestsByTeam(team_id: number) {
    return doGet('duo-request', true, { team_id: team_id })
  }

  function updateDuoRequest(duoUpdate: DuoRequestUpdate) {
    return doPatch(
      'duo-request/' + duoUpdate.id,
      {
        status: duoUpdate.status,
        player: duoUpdate.player_id
      },
      true
    )
  }

  return { createDuoRequest, getAllDuoRequestsByTeam, updateDuoRequest }
})
