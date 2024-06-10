import axios from 'axios';
import DishScheduleItem from "../interfaces/DishScheduleItem.tsx";

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
//const URL_GET = `${API_HOST}/dish-schedule/:id`;
const URL_GET_PERIOD = `${API_HOST}/dish-schedule/period`;
const URL_SAVE = `${API_HOST}/dish-schedule/save`;

interface PayloadGetWeekI {
    startDate: string,
    endDate: string
}
interface PayloadSave {
    date: string,
    moment: string,
    dishIds: number[],
}

export class DishScheduleAPI {
    static async getPeriod(payload : PayloadGetWeekI) : Promise<DishScheduleItem[]>{
        return axios.get(URL_GET_PERIOD, {
            params : payload
        }).then(res => {
            return res.data
        })
    }

    static async save(payload : PayloadSave): Promise<DishScheduleItem> {
        return axios.post(URL_SAVE, {
            ...payload
        }).then(res => {
            return res.data
        })
    }
}