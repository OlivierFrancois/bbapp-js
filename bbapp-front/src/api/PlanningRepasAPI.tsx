import axios from 'axios';
import Plat from '../interfaces/Plat';
import PlanningRepas from "../interfaces/PlanningRepas.tsx";

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
//const URL_GET = `${API_HOST}/planning-repas/:id`;
const URL_GET_WEEK = `${API_HOST}/planning-repas/week`;
const URL_SAVE = `${API_HOST}/planning-repas/save`;

interface PayloadGetWeekI {
    startDate: string,
    endDate: string
}
interface PayloadSave {
    date: string,
    moment: string,
    plats: Plat[],
}

export class PlanningRepasAPI {
    static async getPlanningWeek(payload : PayloadGetWeekI) : Promise<PlanningRepas[]>{
        return axios.get(URL_GET_WEEK, {
            params : payload
        }).then(res => {
            return res.data
        })
    }

    static async save(payload : PayloadSave): Promise<PlanningRepas> {
        return axios.post(URL_SAVE, {
            ...payload
        }).then(res => {
            return res.data
        })
    }
}