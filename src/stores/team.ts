import { defineStore } from "pinia";
import { doGet, doPost } from "./api";

export interface Team {
    id?: number,
    name: string
}

export const useTeamStore = defineStore('team', () => {

    function createTeam(name: String) {
        return doPost("team", {"name": name });
    }

    function getAllTeams() {
        return doGet("team", true);    
    }

    function getTeam(id: string | string[]) {
        return doGet("team/" + id, true);
    }

    function getMyTeam() {
        return doGet("team", true);
    }

    function verifyTeam(name: string) {
        return doGet("team/all?name=" + name);
    }

    return { createTeam, getAllTeams, getTeam, getMyTeam, verifyTeam };

})