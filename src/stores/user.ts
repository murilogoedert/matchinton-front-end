import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API_URL } from './api'
import axios from 'axios';
import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';
import Cookies from "cookies-ts";

//Cookies para manter o login persistido por até 1 dia
const cookiesHandle = new Cookies();
cookiesHandle.config({ expires: "1d" });

export interface User {
    id: number,
    name: string,
    username: string,
    phone: string,
    type: string,
    created_at?: string,
    updated_at?: string,
    jwt_token?: string
}

interface AuthInfo {
    user: User,
    token: string
}

export const useUserStore = defineStore('user', () => {

    const globalUser = ref<User>();

    async function login(username: string, password: string) {
        if (!globalUser.value) {
            const userCookies = cookiesHandle.get('user');
            if(!userCookies){
                const userInfo = await axios.post<AuthInfo>(API_URL + '/auth', { 'username': username, 'password': password }, {
                    validateStatus: () => true
                });
    
                if (userInfo.status == 201) {
                    var user = userInfo.data.user;
                    user.jwt_token = userInfo.data.token;
                    setUser(user);
                    cookiesHandle.set('user', user);
                }
            }
        }
        return globalUser;
    }

    async function signup(name: string, username: string, phone: string, password: string){
        return axios.post<User>(API_URL + '/user', {'name': name, 'username': username, 'password': password, 'phone': phone, 'type': 'USER'},{
            validateStatus: () => true
        })
    }

    function logout() {
        globalUser.value = undefined;
        cookiesHandle.remove('user');
        goToLoginIfNotLoggedIn();
    }

    function setUser(user: User) {
        globalUser.value = user;
    }


    function getUser() {
        if (!globalUser.value) {
            globalUser.value = cookiesHandle.get('user') as unknown as User;
        }
        return globalUser;
    }

    return { getUser, login, logout, signup }
})