import axios from 'axios';
import { ArticleCategory } from '../../types/ArticleCategory.tsx';

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
const URL_GET_BY_NAME = `${API_HOST}/article-category/search/by-name`;
const URL_GET = `${API_HOST}/article-category/:categoryId`;
const URL_DELETE = `${API_HOST}/article-category/:categoryId`;
const URL_CREATE = `${API_HOST}/article-category`;
const URL_UPDATE = `${API_HOST}/article-category/:categoryId`;
const URL_GET_ALL = `${API_HOST}/article-category`;

export class ArticleCategoryAPI {
    static async getByName(payload: { name: string }): Promise<ArticleCategory[]> {
        return axios
            .get(URL_GET_BY_NAME, {
                params: payload,
            })
            .then((res) => {
                return res.data;
            });
    }

    static async get(id: number): Promise<ArticleCategory[]> {
        return axios.get(URL_GET.replace(':categoryId', id.toString())).then((res) => {
            return res.data;
        });
    }

    static async getAll(): Promise<ArticleCategory[]> {
        return axios.get(URL_GET_ALL, {}).then((res) => {
            return res.data;
        });
    }

    static async create(category: Omit<ArticleCategory, 'id'>): Promise<ArticleCategory> {
        return axios.post(URL_CREATE, { ...category }).then((res) => {
            return res.data;
        });
    }

    static async update(category: ArticleCategory): Promise<ArticleCategory> {
        return axios.put(URL_UPDATE.replace(':categoryId', category.id.toString()), { ...category }).then((res) => {
            return res.data;
        });
    }

    static async delete(categoryId: number): Promise<{ message: string }> {
        return axios.delete(URL_DELETE.replace(':categoryId', categoryId.toString())).then((res) => {
            return res.data;
        });
    }
}
