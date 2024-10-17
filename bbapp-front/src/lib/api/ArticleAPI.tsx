import axios from 'axios';
import { Article } from '../../types/Article.tsx';

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
const URL_GET_BY_NAME = `${API_HOST}/article/search/by-name`;
const URL_GET = `${API_HOST}/article/:articleId`;
const URL_GET_ALL = `${API_HOST}/article`;
const URL_CREATE = `${API_HOST}/article/`;
const URL_UPDATE = `${API_HOST}/article/:articleId`;
const URL_DELETE = `${API_HOST}/article/:articleId`;

export class ArticleAPI {
    static async get(id: number): Promise<Article[]> {
        return axios.get(URL_GET.replace(':articleId', id.toString())).then((res) => {
            return res.data;
        });
    }

    static async getByName(payload: { name: string }): Promise<Article[]> {
        return axios
            .get(URL_GET_BY_NAME, {
                params: payload,
            })
            .then((res) => {
                return res.data;
            });
    }

    static async getAll(): Promise<Article[]> {
        return axios.get(URL_GET_ALL, {}).then((res) => {
            return res.data;
        });
    }

    static async create(article: Omit<Article, 'id'>): Promise<Article> {
        return axios.post(URL_CREATE, { ...article }).then((res) => {
            return res.data;
        });
    }

    static async update(article: Article): Promise<Article> {
        return axios.put(URL_UPDATE.replace(':articleId', article.id.toString()), { ...article }).then((res) => {
            return res.data;
        });
    }

    static async delete(articleId: number): Promise<{ message: string }> {
        return axios.delete(URL_DELETE.replace(':articleId', articleId.toString())).then((res) => {
            return res.data;
        });
    }
}
