import { Article } from '../../types/Article.tsx';
import api from '../api.ts';
import { API_ENDPOINTS } from '../../routes.ts';

export class ArticleAPI {
    static async get(id: number): Promise<Article> {
        return api.get(API_ENDPOINTS.articles.get(id)).then((res) => res.data);
    }

    static async getByName(payload: { name: string }): Promise<Article[]> {
        return api.get(API_ENDPOINTS.articles.getByName, { params: payload }).then((res) => res.data);
    }

    static async getAll(): Promise<Article[]> {
        return api.get(API_ENDPOINTS.articles.getAll).then((res) => res.data);
    }

    static async create(article: Omit<Article, 'id'>): Promise<Article> {
        return api.post(API_ENDPOINTS.articles.create, { ...article }).then((res) => res.data);
    }

    static async update(article: Article): Promise<Article> {
        return api.put(API_ENDPOINTS.articles.update(article.id), { ...article }).then((res) => res.data);
    }

    static async delete(articleId: number): Promise<{ message: string }> {
        return api.delete(API_ENDPOINTS.articles.delete(articleId)).then((res) => res.data);
    }
}
