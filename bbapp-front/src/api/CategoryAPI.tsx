import axios from 'axios';
import Category from "../interfaces/Category.tsx";

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
const URL_GET_ALL = `${API_HOST}/category/all`;
const URL_GET = `${API_HOST}/category/:categoryId`;
const URL_GET_BY_NAME = `${API_HOST}/category/by-name`;
const URL_SAVE = `${API_HOST}/category/:categoryId/save`;
const URL_DELETE = `${API_HOST}/category/:categoryId/delete`;

interface PayloadSave {
    id: number,
    name: string,
}

export class CategoryAPI {
    static async get(id: number) : Promise<Category[]>{
        return axios.get(URL_GET.replace(':categoryId', id.toString()))
            .then(res => {
            return res.data
        })
    }

    static async getByName(payload : { name: string }) : Promise<Category[]>{
        return axios.get(URL_GET_BY_NAME, {
            params : payload
        }).then(res => {
            return res.data
        })
    }

    static async getAll() : Promise<Category[]>{
        return axios.get(URL_GET_ALL, {})
            .then(res => {
            return res.data
        })
    }

    static async save(payload: PayloadSave): Promise<Category|null>{
        return axios.post(URL_SAVE.replace(':categoryId', payload.id.toString()), {...payload})
            .then(res => {
            return res.data
        })
    }

    static async delete(categoryId: number): Promise<{message: string}>{
        return axios.post(URL_DELETE.replace(':categoryId', categoryId.toString()))
            .then(res => {
                return res.data
            })
    }
}