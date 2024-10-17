import axios from 'axios';
import { DishScheduleItem } from '../../types/DishScheduleItem.tsx';
import { API_ENDPOINTS } from '../../routes.ts';

type PayloadGetWeekI = {
    startDate: string;
    endDate: string;
};
type PayloadSave = {
    date: string;
    moment: string;
    dishIds: number[];
};
type PayloadAdd = {
    date: string;
    moment: string;
    dishId: number;
};

export class DishScheduleAPI {
    static async getPeriod(payload: PayloadGetWeekI): Promise<DishScheduleItem[]> {
        return axios
            .get(API_ENDPOINTS.dishSchedule.getPeriod, {
                params: payload,
            })
            .then((res) => {
                return res.data;
            });
    }

    static async save(payload: PayloadSave): Promise<DishScheduleItem> {
        return axios
            .post(API_ENDPOINTS.dishSchedule.save, {
                ...payload,
            })
            .then((res) => {
                return res.data;
            });
    }

    static async add(payload: PayloadAdd): Promise<DishScheduleItem> {
        return axios
            .post(API_ENDPOINTS.dishSchedule.add, {
                ...payload,
            })
            .then((res) => {
                return res.data;
            });
    }

    static async remove(payload: PayloadAdd): Promise<void> {
        return axios
            .post(API_ENDPOINTS.dishSchedule.remove, {
                ...payload,
            })
            .then((res) => {
                return res.data;
            });
    }
}
