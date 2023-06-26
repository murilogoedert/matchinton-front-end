import { useUserStore } from './user'
import axios, { type AxiosRequestConfig } from 'axios'

export const API_URL = 'https://matchinton-app-276wa.ondigitalocean.app'
// export const API_URL = 'http://localhost:3000'
export const IMG_URL = 'https://matchintonimages.nyc3.cdn.digitaloceanspaces.com'

function getAuthHeader(): AxiosRequestConfig {
  const userStore = useUserStore()
  var currentUser = userStore.getUser()
  return {
    headers: {
      Authorization: 'Bearer ' + currentUser.value?.jwt_token
    }
  }
}

export async function doPost(route: string, data: object, auth?: boolean) {
  if (auth) {
    return axios.post(API_URL + '/' + route, data, getAuthHeader())
  }
  return axios.post(API_URL + '/' + route, data)
}

export async function doPatch(route: string, data: object, auth?: boolean) {
  if (auth) {
    return axios.patch(API_URL + '/' + route, data, getAuthHeader())
  }
  return axios.patch(API_URL + '/' + route, data)
}

export async function doGet(route: string, auth?: boolean, params?: object) {
  var oOptions = { params: {} }
  if (params) {
    oOptions = {
      params: params
    }
  }
  if (auth) {
    var headers = getAuthHeader()
    headers.params = oOptions.params
    return axios.get(API_URL + '/' + route, headers)
  }
  return axios.get(API_URL + '/' + route, oOptions)
}

export async function doUploadImagePlayer(playerId: number, data: File) {
  const config = getAuthHeader()
  const form = new FormData()
  form.append('file', data)
  return axios.post(API_URL + '/player/' + playerId + '/upload', form, config)
}

export async function doGetImage(image: string, auth?: boolean) {
  if (auth) {
    return axios.get(IMG_URL + '/' + image, getAuthHeader())
  }
  return axios.get(IMG_URL + '/' + image)
}
