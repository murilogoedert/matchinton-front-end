import { defineStore } from "pinia";
import axios from "axios";
import { API_URL, doGet, doGetImage, doPost } from "./api";
import { useUserStore } from "./user";

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
    updated_at?: string
}

export const usePlayerStore = defineStore('player', () => {

    function getPlayer(id: string | string[]) {
        return doGet("player/" + id, true);
    }

    function getPlayers() {
        return doGet("player/team/4", true);
    }

    function addPlayer(player: Player) {
        return doPost('player', player, true);
    }

    return { addPlayer, getPlayer, getPlayers };
    
})