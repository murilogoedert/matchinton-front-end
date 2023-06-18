import { defineStore } from "pinia";
import { doGet, doPatch, doPost } from "./api";

export interface Category {
    id?: number,
    name: string,
    min_age: number,
    max_age: number
}

export interface Competition {
    id?: number,
    name: string,
    start_date: string,
    end_date: string,
    categories: string[]
}

export interface getCompetition {
    id?: number,
    name: string,
    start_date: string,
    end_date: string,
    competition_category: string[]
}

export const useCompStore = defineStore('competition', () => {

    function getCatgs() {
        return doGet("category", true);
    }

    function addCompetition(comp: Competition) {
        return doPost("competition", comp, true);
    }

    function getCompetition(id: string | string[]) {
        return doGet("competition/" + id, true);
    }

    function updateCompetition(comp: getCompetition) {
        return doPatch("competition/" + comp.id, {
            name: comp.name,
            start_date: new Date(comp.start_date).toISOString(),
            end_date: new Date(comp.end_date).toISOString(),
        }, true);
    }

    function getComps() {
        return doGet("competition/", true);
    }

    return { getCatgs, addCompetition, getCompetition, updateCompetition, getComps };

})