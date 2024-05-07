import {HttpContext} from "@adonisjs/core/http";
import Plat from "#models/plat";

export default class PlatsController {
    async getAll() {
        return Plat.all();
    }

    async getPlat({request}: HttpContext): Promise<Plat | null> {
        const platId = request.param('id');
        return Plat.find(platId);
    }

    async getByName({request}: HttpContext): Promise<Plat[] | null> {
        const {nom} = request.all();
        return await Plat.query()
            .where('nom', 'like', `%${nom}%`).exec()
    }

    async save({request}: HttpContext): Promise<Plat | null> {
        const {nom} = request.all();
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
            return {message: 'deleted'}
        } else {
            return {message: 'not found'}
        }
    }
}
