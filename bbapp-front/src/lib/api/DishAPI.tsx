import { Dish } from '../../types/Dish.tsx';
import { RecipeItem } from '../../types/RecipeItem.tsx';
import api from '../api.ts';

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
const URL_GET_BY_NAME = `${API_HOST}/dish/search/by-name`;
const URL_GET = `${API_HOST}/dish/:dishId`;
const URL_UPDATE = `${API_HOST}/dish/:dishId`;
const URL_DELETE = `${API_HOST}/dish/:dishId`;
const URL_GET_ALL = `${API_HOST}/dish`;
const URL_CREATE = `${API_HOST}/dish`;

export class DishAPI {
    static async get(id: number): Promise<Dish[]> {
        return api.get(URL_GET.replace(':dishId', id.toString())).then((res) => {
            return res.data;
        });
    }

    static async getByName(payload: { name: string }): Promise<Dish[]> {
        return api
            .get(URL_GET_BY_NAME, {
                params: payload,
            })
            .then((res) => {
                return res.data;
            });
    }

    static async getAll(): Promise<Dish[]> {
        return api.get(URL_GET_ALL, {}).then((res) => {
            return res.data;
        });
    }

    static async create(dish: Omit<Dish, 'id'>): Promise<Dish> {
        return api.post(URL_CREATE, { ...dish }).then((res) => {
            return res.data;
        });
    }

    static async update(dish: Dish, recipeItems: RecipeItem[]): Promise<{ dish: Dish; recipeItems: RecipeItem[] }> {
        return api.put(URL_UPDATE.replace(':dishId', dish.id.toString()), { ...dish, recipeItems }).then((res) => {
            return res.data;
        });
    }

    static async delete(dishId: number): Promise<{ message: string }> {
        return api.delete(URL_DELETE.replace(':dishId', dishId.toString())).then((res) => {
            return res.data;
        });
    }
}
