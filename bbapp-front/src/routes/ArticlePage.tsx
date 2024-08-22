import dayjs from "dayjs";
import 'dayjs/locale/fr';
import List from "../components/Article/List.tsx";
import React, {createContext, useEffect, useState} from "react";
import SlideUpModal from "../components/SlideUpModal/SlideUpModal.tsx";
import {Article} from "../types/Article.tsx";
import ArticleHeader from "../components/Article/Edit/ArticleHeader.tsx";
import ArticleBody from "../components/Article/Edit/ArticleBody.tsx";
import {Category} from "../types/Category.tsx";
import {ArticleAPI} from "../api/ArticleAPI.tsx";
import {CategoryAPI} from "../api/CategoryAPI.tsx";
import CategoryBody from "../components/Article/Edit/CategoryBody.tsx";
import CategoryHeader from "../components/Article/Edit/CategoryHeader.tsx";
dayjs.locale('fr');

interface ArticleContextI {
    selectedArticle: Article | null,
    setSelectedArticle: React.Dispatch<React.SetStateAction<Article|null>>
    selectedCategory: Category | null,
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category|null>>
    categories: Category[],
    articles: Article[],
}

export const ArticleContext = createContext<ArticleContextI>({} as ArticleContextI);

export default function ArticlePage() {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        ArticleAPI.getAll()
            .then(fetchedArticles => setArticles(fetchedArticles));
        CategoryAPI.getAll()
            .then(fetchedCategories => setCategories(fetchedCategories));
    }, [selectedArticle, selectedCategory]);


    const handleArticleCreate = () => {
        const article: Article = {id: 0, name: '', sortOrder: 0, categoryId: 0};
        setSelectedArticle(article);
    }

    const handleCategoryCreate = () => {
        const category: Category = {id: 0, name: '', sortOrder: 0};
        setSelectedCategory(category);
    }


    return (
        <ArticleContext.Provider value={{selectedArticle, setSelectedArticle, selectedCategory, setSelectedCategory, articles, categories}}>
            <div className={'h-screen flex flex-col gap-2 relative overflow-hidden w-full'}>
                <div className={'bg-gradient-to-br from-primary to-primary/85 from-10% text-secondary-content font-semibold text-xl px-2 py-1 h-12 flex justify-between items-center'}>
                    <div>Liste des articles</div>
                </div>

                <div className="flex justify-center items-center gap-4">
                    <button className={'btn btn-primary btn-sm'} onClick={handleCategoryCreate}>Nouvelle catégorie</button>
                    <button className={'btn btn-primary btn-sm'} onClick={handleArticleCreate}>Nouvel article</button>
                </div>

                <List/>

                <SlideUpModal
                    displayCondition={selectedArticle !== null}
                    handleClose={() => {
                        setSelectedArticle(null)
                    }}
                    headerContent={<ArticleHeader/>}
                    bodyContent={<ArticleBody/>}
                />

                <SlideUpModal
                    displayCondition={selectedCategory !== null}
                    handleClose={() => {
                        setSelectedCategory(null)
                    }}
                    headerContent={<CategoryHeader/>}
                    bodyContent={<CategoryBody/>}
                />
            </div>
        </ArticleContext.Provider>
);
}
