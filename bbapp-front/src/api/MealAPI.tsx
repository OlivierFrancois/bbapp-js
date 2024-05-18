import axios from 'axios';
import Meal from "../interfaces/Meal.tsx";

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
const URL_GET_ALL = `${API_HOST}/meal/all`;
const URL_GET = `${API_HOST}/meal/:id`;
const URL_GET_BY_NAME = `${API_HOST}/meal/by-name`;
const URL_SAVE = `${API_HOST}/meal/:id/save`;

interface PayloadSave {
    id: number,
    name: string,
}

export class MealAPI {
    static async get(id: number) : Promise<Meal[]>{
        return axios.get(URL_GET.replace(':id', id.toString()))
            .then(res => {
            return res.data
        })
    }

    static async getByName(payload : { name: string }) : Promise<Meal[]>{
        return axios.get(URL_GET_BY_NAME, {
            params : payload
        }).then(res => {
            return res.data
        })
    }

    static async getAll() : Promise<Meal[]>{
        return axios.get(URL_GET_ALL, {})
            .then(res => {
            return res.data
        })
    }

    static async save(payload: PayloadSave): Promise<Meal|null>{
        return axios.post(URL_SAVE.replace(':id', payload.id.toString()), {...payload})
            .then(res => {
            return res.data
        })
    }
}