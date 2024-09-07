import dayjs from "dayjs";
import 'dayjs/locale/fr';
import List from "./components/list.component.tsx";
import React, { createContext, useEffect, useState } from 'react';
import {Dish} from "../../types/Dish.tsx";
import DishHeader from "./components/edit/dish-header.component.tsx";
import Body from "./components/edit/body.component.tsx";
import { Article } from '../../types/Article.tsx';
import { ArticleAPI } from '../../api/ArticleAPI.tsx';
import SlideUpModal from "../../components/slide-up-modal/slide-up-modal.component.tsx";
import {DishCategory} from "../../types/DishCategory.tsx";
import {DishAPI} from "../../api/DishAPI.tsx";
import {DishCategoryAPI} from "../../api/DishCategoryAPI.tsx";
import CategoryHeader from "./components/edit/category-header.component.tsx";
import CategoryBody from "./components/edit/category-body.component.tsx";
dayjs.locale('fr');

interface DishContextI {
    selectedDish: Dish | null,
    setSelectedDish: React.Dispatch<React.SetStateAction<Dish|null>>
    selectedCategory: DishCategory | null,
    setSelectedCategory: React.Dispatch<React.SetStateAction<DishCategory|null>>
    dishCategories: DishCategory[],
    dishes: Dish[],
    articles: Article[],
    refreshArticles: () => void,
}

export const DishContext = createContext<DishContextI>({} as DishContextI);

export default function DishPage() {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

    const [dishCategories, setDishCategories] = useState<DishCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<DishCategory | null>(null);

    const [articles, setArticles] = useState<Article[]>([]);
    const refreshArticles = () => ArticleAPI.getAll().then(r => setArticles(r));
    useEffect(() => {
        refreshArticles();
    }, []);

    useEffect(() => {
        DishAPI.getAll().then(r => setDishes(r));
    }, [selectedDish]);
    useEffect(() => {
        DishCategoryAPI.getAll().then(r => setDishCategories(r));
    }, [selectedCategory]);

    const dishContextProvider = {
        selectedDish,
        setSelectedDish,
        selectedCategory,
        setSelectedCategory,
        dishCategories,
        dishes,
        articles,
        refreshArticles,
    };

    const handleDishCreate = (dishCategoryId?: number) => {
        const dish: Dish = {id: 0, name: '', dishCategoryId};
        setSelectedDish(dish);
    }

    const handleCategoryCreate = () => {
        const category: DishCategory = {id: 0, name: '', sortOrder: 0};
        setSelectedCategory(category);
    }

    return (
        <DishContext.Provider value={dishContextProvider}>
            <div className={'h-screen flex flex-col gap-2 relative overflow-hidden w-full'}>
                <div
                    className={'bg-gradient-to-br from-primary to-primary/85 from-10% text-secondary-content font-semibold text-xl px-2 py-1 h-12 flex justify-between items-center'}>
                    <div>Liste des plats</div>
                </div>

                <div className="flex justify-center items-center gap-4">
                    <button className={'btn btn-primary btn-sm'} onClick={handleCategoryCreate}>
                        Nouvelle catégorie
                    </button>

                    <button className={'btn btn-primary btn-sm'} onClick={() => handleDishCreate}>
                        Nouveau plat
                    </button>
                </div>

                <List handleDishCreate={handleDishCreate}/>

                <SlideUpModal
                    displayCondition={selectedDish !== null}
                    handleClose={() => {
                        setSelectedDish(null)
                    }}
                    headerContent={<DishHeader/>}
                    bodyContent={<Body/>}
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
        </DishContext.Provider>
    );
}
