import axios from 'axios'
import appsConfig from '../../../apps.config.json'

const BACKEND_KEY = 'wilayah_backend_url'

export function getBackendUrl() {
  return localStorage.getItem(BACKEND_KEY) || appsConfig.backends[0].url
}

export function setBackendUrl(url) {
  localStorage.setItem(BACKEND_KEY, url)
}

function api() {
  return axios.create({ baseURL: `${getBackendUrl()}/api` })
}

export const getProvinsi = () => api().get('/wilayah')
export const getWilayah  = (kode) => api().get(`/wilayah/${kode}`)
