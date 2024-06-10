import Dish from "./Dish.tsx";

export default interface DishScheduleItem {
    id: number,
    createdAt: string,
    updatedAt: string,
    date: string,
    moment: string,
    dishes: Dish[],
}