import axios from 'axios';
import Plat from "../interfaces/Plat";


const API_HOST = import.meta.env.VITE_API_ENDPOINT;
const URL_GET_ALL = `${API_HOST}/plat/all`;
const URL_GET = `${API_HOST}/plat/:id`;
const URL_GET_BY_NAME = `${API_HOST}/plat/by-name`;
const URL_SAVE = `${API_HOST}/plat/:id/save`;

export class PlatAPI {
    static async get(id: number) : Promise<Plat[]>{
        return axios.get(URL_GET.replace(':id', id.toString()))
            .then(res => {
            return res.data
        })
    }

    static async getPlatsByName(payload : { nom: string }) : Promise<Plat[]>{
        return axios.get(URL_GET_BY_NAME, {
            params : payload
        }).then(res => {
            return res.data
        })
    }

    static async getAll() : Promise<Plat[]>{
        return axios.get(URL_GET_ALL, {})
            .then(res => {
            return res.data
        })
    }

    static async savePlat(plat: Plat): Promise<Plat|null>{
        return axios.post(URL_SAVE.replace(':id', plat.id.toString()), {plat})
            .then(res => {
            return res.data
        })
    }
}