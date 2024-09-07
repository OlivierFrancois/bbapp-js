import dayjs from "dayjs";
import 'dayjs/locale/fr';
import List from "./components/list.component.tsx";
import React, {createContext, useEffect, useState} from "react";
import {Article} from "../../types/Article.tsx";
import ArticleHeader from "./components/edit/article-header.component.tsx";
import ArticleBody from "./components/edit/article-body.component.tsx";
import {ArticleCategory} from "../../types/ArticleCategory.tsx";
import {ArticleAPI} from "../../api/ArticleAPI.tsx";
import {ArticleCategoryAPI} from "../../api/ArticleCategoryAPI.tsx";
import CategoryBody from "./components/edit/category-body.component.tsx";
import CategoryHeader from "./components/edit/category-header.component.tsx";
import SlideUpModal from "../../components/slide-up-modal/slide-up-modal.component.tsx";
dayjs.locale('fr');

interface ArticleContextI {
    selectedArticle: Article | null,
    setSelectedArticle: React.Dispatch<React.SetStateAction<Article|null>>
    selectedCategory: ArticleCategory | null,
    setSelectedCategory: React.Dispatch<React.SetStateAction<ArticleCategory|null>>
    categories: ArticleCategory[],
    articles: Article[],
}

export const ArticleContext = createContext<ArticleContextI>({} as ArticleContextI);

export default function ArticlePage() {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<ArticleCategory[]>([]);

    useEffect(() => {
        ArticleAPI.getAll()
            .then(fetchedArticles => setArticles(fetchedArticles));
        ArticleCategoryAPI.getAll()
            .then(fetchedCategories => setCategories(fetchedCategories));
    }, [selectedArticle, selectedCategory]);


    const handleArticleCreate = () => {
        const article: Article = {id: 0, name: '', sortOrder: 0, categoryId: 0};
        setSelectedArticle(article);
    }

    const handleCategoryCreate = () => {
        const category: ArticleCategory = {id: 0, name: '', sortOrder: 0};
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
