import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref({})

    function login() {
        //Realizar lgin
    }

    return { user, login }
})
