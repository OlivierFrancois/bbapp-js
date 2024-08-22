import axios from 'axios';
import {Category} from "../types/Category.tsx";

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
const URL_GET_BY_NAME = `${API_HOST}/category/search/by-name`;
const URL_GET = `${API_HOST}/category/:categoryId`;
const URL_DELETE = `${API_HOST}/category/:categoryId`;
const URL_CREATE = `${API_HOST}/category`;
const URL_UPDATE = `${API_HOST}/category/:categoryId`;
const URL_GET_ALL = `${API_HOST}/category`;

export class CategoryAPI {
    static async getByName(payload : { name: string }) : Promise<Category[]>{
        return axios.get(URL_GET_BY_NAME, {
            params : payload
        }).then(res => {
            return res.data
        })
    }

    static async get(id: number) : Promise<Category[]>{
        return axios.get(URL_GET.replace(':categoryId', id.toString()))
            .then(res => {
            return res.data
        })
    }

    static async getAll() : Promise<Category[]>{
        return axios.get(URL_GET_ALL, {})
            .then(res => {
            return res.data
        })
    }

    static async create(category: Omit<Category, 'id'>): Promise<Category>{
        return axios.post(URL_CREATE, {...category})
            .then(res => {
            return res.data
        })
    }

    static async update(category: Category): Promise<Category>{
        return axios.put(URL_UPDATE.replace(':categoryId', category.id.toString()), {...category})
            .then(res => {
            return res.data
        })
    }

    static async delete(categoryId: number): Promise<{message: string}>{
        return axios.delete(URL_DELETE.replace(':categoryId', categoryId.toString()))
            .then(res => {
                return res.data
            })
    }
}