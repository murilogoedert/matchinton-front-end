import { defineStore } from "pinia";
import axios from "axios";
import { API_URL, doGet, doGetImage, doPost } from "./api";
import { useUserStore } from "./user";
import { useTeamStore, type Team } from "./team";

export interface Player {
    id?: number,
    name: string,
    observation: string,
    birth_date: string,
    city: string,
    state: string,
    team_id: number,
    photo?: string,
    created_at?: string,
    updated_at?: string,
}

export interface PlayerHome {
    player: Player,
    details: boolean
}

export const usePlayerStore = defineStore('player', () => {

    function getPlayer(id: string | string[]) {
        return doGet("player/" + id, true);
    }

    function getAllPlayers() {
        return doGet("player/search", true);
    }

    function addPlayer(player: Player) {
        return doPost('player', player, true);
    }

    function calcAge(dataString: string): number {
        const dataNascimento: Date = new Date(dataString);
        const dataAtual: Date = new Date();
      
        // Obtem o ano de nascimento e o ano atual
        const anoNascimento: number = dataNascimento.getFullYear();
        const anoAtual: number = dataAtual.getFullYear();
      
        // Calcula a diferença de anos
        let idade: number = anoAtual - anoNascimento;
      
        // Verifica se o aniversario ja ocorreu neste ano
        const mesAtual: number = dataAtual.getMonth() + 1;
        const diaAtual: number = dataAtual.getDate();
        const mesNascimento: number = dataNascimento.getMonth() + 1;
        const diaNascimento: number = dataNascimento.getDate();
      
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
          // Ainda nao fez aniversario neste ano, diminui a idade em 1
          idade--;
        }
      
        return idade;
    }

    return { addPlayer, getPlayer, getAllPlayers, calcAge };
    
})