import { defineStore } from "pinia";
import { doGet } from "./api";

export interface Team {
    id?: number,
    name: string
}

export const useTeamStore = defineStore('team', () => {

    function getAllTeams() {
        return doGet("team", true);    
    }

    function getTeam(id: string | string[]) {
        return doGet("team/" + id, true);
    }

    return { getAllTeams, getTeam };

})