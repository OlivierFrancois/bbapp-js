// import type { HttpContext } from '@adonisjs/core/http'

import Category from "#models/category";
import {HttpContext} from "@adonisjs/core/http";

export default class CategoryController {
    async getAll() {
        return Category.all();
    }

    async get({request}: HttpContext): Promise<Category | null> {
        return Category.find(request.param('id'));
    }

    async getByName({request}: HttpContext): Promise<Category[] | null> {
        const {name} = request.all();
        return await Category.query()
            .where('name', 'like', `%${name}%`).exec()
    }

    async save({request}: HttpContext): Promise<Category | null> {
        const {name, sortOrder} = request.all();
        let category = await Category.find(request.param('id') ?? 0);
        if (!category) category = new Category();

        category.name = name.toLowerCase();
        category.sortOrder = sortOrder ?? 0;

        await category.save();

        return category;
    }

    async delete({request}: HttpContext) {
        let category = await Category.find(request.param('id') ?? 0);
        if (category) {
            await category.delete();
            return {message: 'deleted'}
        } else {
            return {message: 'not found'}
        }
    }
}
