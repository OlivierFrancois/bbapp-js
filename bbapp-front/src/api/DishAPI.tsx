import axios from 'axios';
import Dish from "../interfaces/Dish.tsx";

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
const URL_GET_ALL = `${API_HOST}/dish/all`;
const URL_GET = `${API_HOST}/dish/:dishId`;
const URL_GET_BY_NAME = `${API_HOST}/dish/by-name`;
const URL_SAVE = `${API_HOST}/dish/:dishId/save`;
const URL_DELETE = `${API_HOST}/dish/:dishId/delete`;

interface PayloadSave {
    id: number,
    name: string,
}

export class DishAPI {
    static async get(id: number) : Promise<Dish[]>{
        return axios.get(URL_GET.replace(':dishId', id.toString()))
            .then(res => {
            return res.data
        })
    }

    static async getByName(payload : { name: string }) : Promise<Dish[]>{
        return axios.get(URL_GET_BY_NAME, {
            params : payload
        }).then(res => {
            return res.data
        })
    }

    static async getAll() : Promise<Dish[]>{
        return axios.get(URL_GET_ALL, {})
            .then(res => {
            return res.data
        })
    }

    static async save(payload: PayloadSave): Promise<Dish|null>{
        return axios.post(URL_SAVE.replace(':dishId', payload.id.toString()), {...payload})
            .then(res => {
            return res.data
        })
    }

    static async delete(dishId: number): Promise<{message: string}>{
        return axios.post(URL_DELETE.replace(':dishId', dishId.toString()))
            .then(res => {
                return res.data
            })
    }
}