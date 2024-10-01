import dayjs from "dayjs";
import 'dayjs/locale/fr';
import React, { createContext, useEffect, useState } from 'react';
import {Dish} from "../../../types/Dish.tsx";
import { Article } from '../../../types/Article.tsx';
import { ArticleAPI } from '../../../api/ArticleAPI.tsx';
import SlideUpModal from "../../../components/slide-up-modal/slide-up-modal.component.tsx";
import {DishTag} from "../../../types/DishTag.tsx";
import {DishAPI} from "../../../api/DishAPI.tsx";
import {DishTagAPI} from "../../../api/DishTagAPI.tsx";
import Header from "./components/dish-edit/header.component.tsx";
import Body from "./components/dish-edit/body.component.tsx";
import TagHeader from "./components/dish-tag-edit/tag-header.component.tsx";
import TagBody from "./components/dish-tag-edit/tag-body.component.tsx";
import DishList from "./components/dish-list.component.tsx";
import DishTagList from "./components/dish-tag-list.component.tsx";
dayjs.locale('fr');

interface DishContextI {
    selectedDish: Dish | null,
    setSelectedDish: React.Dispatch<React.SetStateAction<Dish|null>>
    selectedTag: DishTag | null,
    setSelectedTag: React.Dispatch<React.SetStateAction<DishTag|null>>
    dishTags: DishTag[],
    dishes: Dish[],
    articles: Article[],
    refreshArticles: () => void,
}

export const DishContext = createContext<DishContextI>({} as DishContextI);

export default function DishPage() {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

    const [dishTags, setDishTags] = useState<DishTag[]>([]);
    const [selectedTag, setSelectedTag] = useState<DishTag | null>(null);

    const [articles, setArticles] = useState<Article[]>([]);
    const refreshArticles = () => ArticleAPI.getAll().then(r => setArticles(r));
    useEffect(() => {
        refreshArticles();
    }, []);

    useEffect(() => {
        DishAPI.getAll().then(r => setDishes(r));
    }, [selectedDish]);
    useEffect(() => {
        DishTagAPI.getAll().then(r => setDishTags(r));
    }, [selectedTag]);

    const dishContextProvider = {
        selectedDish,
        setSelectedDish,
        selectedTag,
        setSelectedTag,
        dishTags,
        dishes,
        articles,
        refreshArticles,
    };

    return (
        <DishContext.Provider value={dishContextProvider}>
            <div className={'h-screen flex flex-col gap-5 relative overflow-hidden w-full'}>
                <div
                    className={'bg-gradient-to-br from-primary to-primary/85 from-10% text-secondary-content font-semibold text-xl px-2 py-1 h-12 flex justify-between items-center'}>
                    <div>Liste des plats</div>
                </div>

                <DishTagList/>

                <DishList/>

                <SlideUpModal
                    displayCondition={selectedDish !== null}
                    handleClose={() => {
                        setSelectedDish(null)
                    }}
                    headerContent={<Header/>}
                    bodyContent={<Body/>}
                />

                <SlideUpModal
                    displayCondition={selectedTag !== null}
                    handleClose={() => {
                        setSelectedTag(null)
                    }}
                    headerContent={<TagHeader/>}
                    bodyContent={<TagBody/>}
                />
            </div>
        </DishContext.Provider>
    );
}
