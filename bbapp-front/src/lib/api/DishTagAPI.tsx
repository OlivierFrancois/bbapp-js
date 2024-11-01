import { DishTag } from '../../types/DishTag.tsx';
import api from '../api.ts';

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
const URL_GET_BY_NAME = `${API_HOST}/dish-tag/search/by-name`;
const URL_GET = `${API_HOST}/dish-tag/:tagId`;
const URL_DELETE = `${API_HOST}/dish-tag/:tagId`;
const URL_CREATE = `${API_HOST}/dish-tag`;
const URL_UPDATE = `${API_HOST}/dish-tag/:tagId`;
const URL_GET_ALL = `${API_HOST}/dish-tag`;

export class DishTagAPI {
    static async getByName(payload: { name: string }): Promise<DishTag[]> {
        return api
            .get(URL_GET_BY_NAME, {
                params: payload,
            })
            .then((res) => {
                return res.data;
            });
    }

    static async get(id: number): Promise<DishTag[]> {
        return api.get(URL_GET.replace(':tagId', id.toString())).then((res) => {
            return res.data;
        });
    }

    static async getAll(): Promise<DishTag[]> {
        return api.get(URL_GET_ALL, {}).then((res) => {
            return res.data;
        });
    }

    static async create(category: Omit<DishTag, 'id'>): Promise<DishTag> {
        return api.post(URL_CREATE, { ...category }).then((res) => {
            return res.data;
        });
    }

    static async update(category: DishTag): Promise<DishTag> {
        return api.put(URL_UPDATE.replace(':tagId', category.id.toString()), { ...category }).then((res) => {
            return res.data;
        });
    }

    static async delete(tagId: number): Promise<void> {
        return api.delete(URL_DELETE.replace(':tagId', tagId.toString())).then((res) => {
            return res.data;
        });
    }
}
