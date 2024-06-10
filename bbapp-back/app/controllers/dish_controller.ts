import {HttpContext} from "@adonisjs/core/http";
import Dish from "#models/dish";

export default class DishController {
    async getAll() {
        return Dish.all();
    }

    async get({request}: HttpContext): Promise<Dish | null> {
        const dishId = request.param('id');
        return Dish.find(dishId);
    }

    async getByName({request}: HttpContext): Promise<Dish[] | null> {
        const {name} = request.all();
        return await Dish.query()
            .where('name', 'like', `%${name}%`).exec()
    }

    async save({request}: HttpContext): Promise<Dish | null> {
        const {name} = request.all();
        let dish = await Dish.find(request.param('id') ?? 0);
        if (!dish) dish = new Dish();

        dish.name = name.toLowerCase();
        await dish.save();

        return dish;
    }

    async delete({request}: HttpContext) {
        let dish = await Dish.find(request.param('id') ?? 0);
        if (dish) {
            await dish.delete();
            return {message: 'deleted'}
        } else {
            return {message: 'not found'}
        }
    }
}
