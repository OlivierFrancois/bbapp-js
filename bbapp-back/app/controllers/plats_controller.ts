import { HttpContext } from "@adonisjs/core/http";
import Plat from "#models/plat";

export default class PlatsController {
    async getAll() {
        return Plat.all();
    }

    async getPlat({request}: HttpContext): Promise<Plat|null> {
        return Plat.find(request.param('id'));
    }

    async store({request}: HttpContext): Promise<Plat|null> {
        const { nom } = request.all();
        let plat = await Plat.find(request.param('id') ?? 0);
        if (!plat) plat = new Plat();

        plat.nom = nom;
        await plat.save();

        return plat;
    }

    async delete({request}: HttpContext) {
        let plat = await Plat.find(request.param('id') ?? 0);
        if (plat) {
            await plat.delete();
            return {state: 'deleted'}
        } else {
            return {state: 'not found'}
        }
    }
}
