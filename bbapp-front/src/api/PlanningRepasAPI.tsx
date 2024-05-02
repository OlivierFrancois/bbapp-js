import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
const URL_GET = `${API_HOST}/planning-repas/:id`;
const URL_GET_WEEK = `${API_HOST}/planning-repas/week`;
const URL_SAVE = `${API_HOST}/planning-repas/save`;

interface PayloadPlanningWeekI {
    startDate: string,
    endDate: string
}

export class PlanningRepasAPI {
    static async getPlanningWeek(payload : PayloadPlanningWeekI) : Promise<any[]>{
        return axios.get(URL_GET_WEEK, {
            params : payload
        }).then(res => {
            return res.data
        })
    }

    //static async getPlanningDay(payload : { date: string, moment: string}): Promise<any|null> {
    //    return axios.post('/api/planning/get-day', {
    //        ...payload
    //    }).then(res => {
    //        return res.data
    //    })
    //}
}