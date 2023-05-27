import { defineStore } from "pinia";

export const usePlayerStore = defineStore('player', () => {
    const categories = [
        {value: "main", text: "Principal"},
        {value: "23", text: "Sub-23"},
        {value: "19", text: "Sub-19"},
        {value: "17", text: "Sub-17"},
        {value: "15", text: "Sub-16"},
        {value: "13", text: "Sub-13"},
        {value: "11", text: "Sub-11"},
    ]

    function getCatgs() {
        return categories;
    }

    function addPlayer(player: any) {
        //Cadastra um novo player
        console.log(player);
    }

    return { getCatgs, addPlayer };
})