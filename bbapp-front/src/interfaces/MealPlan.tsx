import Meal from "./Meal.tsx";

export default interface MealPlan {
    id: number,
    createdAt: string,
    updatedAt: string,
    date: string,
    moment: string,
    meals: Meal[],
}