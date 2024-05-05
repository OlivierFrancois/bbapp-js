import { HttpContext } from "@adonisjs/core/http";
import PlanningRepas from "#models/planning_repas";

export default class PlanningRepasController {
    async get({request}: HttpContext): Promise<PlanningRepas|null> {
        const planningId = request.param('id');
        return await PlanningRepas.find(planningId);
    }

    async getPlanning({request} : HttpContext): Promise<PlanningRepas[]> {
        const { startDate, endDate } = request.all();

        return await PlanningRepas.query()
            .whereBetween('date', [startDate, endDate])
            .preload('plats')
            .exec() ?? [];
    }

    async save({request} : HttpContext): Promise<PlanningRepas> {
        const { date, moment, platIds } = request.all();

        const searchPayload = {date: date, moment: moment};
        const planning = await PlanningRepas.updateOrCreate(searchPayload, searchPayload);

        await planning.related('plats').detach();
        await planning.related('plats').attach(platIds);

        return planning;
    }
}
