import { defineStore } from "pinia";
import { doGet, doPost } from "./api";

export interface Team {
    id?: number,
    name: string
}

export const useTeamStore = defineStore('team', () => {

    function createTeam(name: String, userId: number) {
        return doPost("team", {
            "name": name,
            "userId": userId
        });
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