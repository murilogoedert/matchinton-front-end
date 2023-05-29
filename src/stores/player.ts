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

    const categories = [
        { value: "main", text: "Principal" },
        { value: "23", text: "Sub-23" },
        { value: "19", text: "Sub-19" },
        { value: "17", text: "Sub-17" },
        { value: "15", text: "Sub-16" },
        { value: "13", text: "Sub-13" },
        { value: "11", text: "Sub-11" },
    ]

    function getCatgs() {
        return categories;
    }

    function getPlayer(id: string | string[]) {
        return doGet("player/" + id, true);
    }

    function getPlayers() {
        return doGet("player/team/4", true);
    }

    function addPlayer(player: Player) {
        return doPost('player', player, true);
    }

    return { getCatgs, addPlayer, getPlayer, getPlayers };
    
})