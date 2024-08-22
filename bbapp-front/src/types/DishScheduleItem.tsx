import {Dish} from "./Dish.tsx";

export type DishScheduleItem = {
    id: number;
    createdAt: string;
    updatedAt: string;
    date: string;
    moment: string;
    dishes: Dish[];
}