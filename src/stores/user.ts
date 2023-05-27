import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref({})

    function login() {
        //Realizar login
        console.log("Loguei");
    }

    function logout() {
        //Realizar logout
        console.log("Desloguei");
    }

    return { user, login, logout }
})