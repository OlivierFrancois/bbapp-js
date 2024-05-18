import { HttpContext } from "@adonisjs/core/http";
import MealPlan from "#models/meal_plan";

export default class MealPlanController {
    async get({request}: HttpContext): Promise<MealPlan|null> {
        const mealPlanId = request.param('id');
        return await MealPlan.find(mealPlanId);
    }

    async getPeriod({request} : HttpContext): Promise<MealPlan[]> {
        const { startDate, endDate } = request.all();

        return await MealPlan.query()
            .whereBetween('date', [startDate, endDate])
            .preload('meals')
            .exec() ?? [];
    }

    async save({request} : HttpContext): Promise<MealPlan> {
        const { date, moment, mealIds } = request.all();

        const searchPayload = {date: date, moment: moment};
        const mealPlan = await MealPlan.updateOrCreate(searchPayload, searchPayload);

        await mealPlan.related('meals').detach();
        await mealPlan.related('meals').attach(mealIds);

        return mealPlan;
    }
}
