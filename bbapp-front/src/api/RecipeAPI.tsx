import axios from 'axios';
import {RecipeItem} from "../types/RecipeItem.tsx";

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
const URL_GET = `${API_HOST}/recipe/:dishId/:articleId`;
const URL_DELETE = `${API_HOST}/recipe/:dishId/:articleId`;
const URL_GET_BY_DISH = `${API_HOST}/recipe/:dishId`;
const URL_GET_BY_ARTICLE = `${API_HOST}/recipe/:articleId`;
const URL_SAVE = `${API_HOST}/recipe`;

export class DishScheduleAPI {
    static async get(dishId: number, articleId: number): Promise<RecipeItem | null> {
        const url = URL_GET
            .replace(':dishId', dishId.toString())
            .replace(':articleId', articleId.toString());
        return axios.get(url)
            .then(res => res.data);
    }

    static async getByDish(dishId: number): Promise<RecipeItem[]> {
        return axios.get(URL_GET_BY_DISH.replace(':dishId', dishId.toString()))
            .then(res => res.data);
    }

    static async getByArticle(articleId: number): Promise<RecipeItem[]> {
        return axios.get(URL_GET_BY_ARTICLE.replace(':articleId', articleId.toString()))
            .then(res => res.data);
    }

    static async save(recipeItem: RecipeItem): Promise<RecipeItem> {
        return axios.post(URL_SAVE, {...recipeItem})
            .then(res => res.data);
    }

    static async delete(dishId: number, articleId: number): Promise<void> {
        const url = URL_DELETE
            .replace(':dishId', dishId.toString())
            .replace(':articleId', articleId.toString());
        return axios.delete(url)
            .then(res => res.data);
    }
}