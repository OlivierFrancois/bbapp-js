import {HttpContext} from "@adonisjs/core/http";
import Meal from "#models/meal";

export default class MealController {
    async getAll() {
        return Meal.all();
    }

    async get({request}: HttpContext): Promise<Meal | null> {
        const mealId = request.param('id');
        return Meal.find(mealId);
    }

    async getByName({request}: HttpContext): Promise<Meal[] | null> {
        const {name} = request.all();
        return await Meal.query()
            .where('name', 'like', `%${name}%`).exec()
    }

    async save({request}: HttpContext): Promise<Meal | null> {
        const {name} = request.all();
        let meal = await Meal.find(request.param('id') ?? 0);
        if (!meal) meal = new Meal();

        meal.name = name.toLowerCase();
        await meal.save();

        return meal;
    }

    async delete({request}: HttpContext) {
        let meal = await Meal.find(request.param('id') ?? 0);
        if (meal) {
            await meal.delete();
            return {message: 'deleted'}
        } else {
            return {message: 'not found'}
        }
    }
}
