import { useUserStore } from "./user";
import axios, { type AxiosRequestConfig } from "axios";

export const API_URL = 'https://matchinton-app-276wa.ondigitalocean.app';

function getAuthHeader(): AxiosRequestConfig{
    const userStore = useUserStore();
    var currentUser = userStore.getUser();
    return {
        headers: {
            Authorization: "Bearer " + currentUser.value?.jwt_token
        }
    };
}

export async function doPost(route: string, data: object, auth?: boolean) {
    if (auth) {
        return axios.post(API_URL + '/' + route, data, getAuthHeader());
    }
    return axios.post(API_URL + '/' + route, data);

}

export async function doUploadImagePlayer(playerId: number, data: File){
    const config = getAuthHeader();
    const form = new FormData();
    form.append('file', data);
    return axios.post(API_URL + '/player/' + playerId + '/upload', form, config);
}