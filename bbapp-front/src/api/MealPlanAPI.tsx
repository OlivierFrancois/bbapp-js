import axios from 'axios';
import MealPlan from "../interfaces/MealPlan.tsx";

const API_HOST = import.meta.env.VITE_API_ENDPOINT;
//const URL_GET = `${API_HOST}/meal-plan/:id`;
const URL_GET_PERIOD = `${API_HOST}/meal-plan/period`;
const URL_SAVE = `${API_HOST}/meal-plan/save`;

interface PayloadGetWeekI {
    startDate: string,
    endDate: string
}
interface PayloadSave {
    date: string,
    moment: string,
    mealIds: number[],
}

export class MealPlanAPI {
    static async getPeriod(payload : PayloadGetWeekI) : Promise<MealPlan[]>{
        return axios.get(URL_GET_PERIOD, {
            params : payload
        }).then(res => {
            return res.data
        })
    }

    static async save(payload : PayloadSave): Promise<MealPlan> {
        return axios.post(URL_SAVE, {
            ...payload
        }).then(res => {
            return res.data
        })
    }
}