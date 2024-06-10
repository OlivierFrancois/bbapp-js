import { HttpContext } from "@adonisjs/core/http";
import DishScheduleItem from "#models/dish_schedule_item";

export default class DishScheduleController {
    async get({request}: HttpContext): Promise<DishScheduleItem|null> {
        const dishScheduleItemId = request.param('id');
        return await DishScheduleItem.find(dishScheduleItemId);
    }

    async getPeriod({request} : HttpContext): Promise<DishScheduleItem[]> {
        const { startDate, endDate } = request.all();

        return await DishScheduleItem.query()
            .whereBetween('date', [startDate, endDate])
            .preload('dishes')
            .exec() ?? [];
    }

    async save({request} : HttpContext): Promise<DishScheduleItem> {
        const { date, moment, dishIds } = request.all();

        const searchPayload = {date: date, moment: moment};
        const dishScheduleItem = await DishScheduleItem.updateOrCreate(searchPayload, searchPayload);

        await dishScheduleItem.related('dishes').detach();
        await dishScheduleItem.related('dishes').attach(dishIds);

        return dishScheduleItem;
    }
}
