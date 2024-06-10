// import type { HttpContext } from '@adonisjs/core/http'

import {HttpContext} from "@adonisjs/core/http";
import Article from "#models/article";
import Category from "#models/category";

export default class ArticleController {
    async getAll() {
        return Article.all();
    }

    async get({request}: HttpContext): Promise<Article | null> {
        return Article.find(request.param('id'));
    }

    async getByName({request}: HttpContext): Promise<Article[] | null> {
        const {name} = request.all();
        return await Article.query()
            .where('name', 'like', `%${name}%`).exec()
    }

    async save({request}: HttpContext): Promise<Article | null> {
        const {name, categoryId, order} = request.all();
        let article = await Article.find(request.param('id') ?? 0);
        if (!article) article = new Article();

        let category = await Category.find(categoryId ?? 0);
        if (category) {
            await article.related('category').associate(category);
        }

        article.name = name.toLowerCase();
        article.order = order ?? 0;

        await article.save();

        return article;
    }

    async delete({request}: HttpContext) {
        let article = await Article.find(request.param('id') ?? 0);
        if (article) {
            await article.delete();
            return {message: 'deleted'}
        } else {
            return {message: 'not found'}
        }
    }
}
