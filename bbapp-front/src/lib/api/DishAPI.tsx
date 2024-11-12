import { Dish } from '../../types/Dish.tsx';
import api from '../api.ts';
import { API_ENDPOINTS } from '../../routes.ts';

export class DishAPI {
    static async get(id: number): Promise<Dish> {
        return api.get(API_ENDPOINTS.dish.get(id)).then((res) => {
            return res.data;
        });
    }

    static async getByName(payload: { name: string }): Promise<Dish[]> {
        return api
            .get(API_ENDPOINTS.dish.getByName, {
                params: payload,
            })
            .then((res) => {
                return res.data;
            });
    }

    static async getStats(id: number): Promise<{ countUses: number }> {
        return api.get(API_ENDPOINTS.dish.getStats(id)).then((res) => {
            return res.data;
        });
    }

    static async getAll(): Promise<Dish[]> {
        return api.get(API_ENDPOINTS.dish.getAll).then((res) => {
            return res.data;
        });
    }

    static async create(dish: Omit<Dish, 'id'>): Promise<Dish> {
        return api.post(API_ENDPOINTS.dish.create, { ...dish }).then((res) => {
            return res.data;
        });
    }

    static async update(dish: Dish): Promise<Dish> {
        return api.put(API_ENDPOINTS.dish.update(dish.id), { ...dish }).then((res) => {
            return res.data;
        });
    }

    static async delete(dishId: number): Promise<{ message: string }> {
        return api.delete(API_ENDPOINTS.dish.delete(dishId)).then((res) => {
            return res.data;
        });
    }
}
