import dayjs from "dayjs";
import 'dayjs/locale/fr';
import List from "../components/Dish/List.tsx";
import React, { createContext, useEffect, useState } from 'react';
import {Dish} from "../types/Dish.tsx";
import SlideUpModal from "../components/SlideUpModal/SlideUpModal.tsx";
import Header from "../components/Dish/Edit/Header.tsx";
import Body from "../components/Dish/Edit/Body.tsx";
import { Article } from '../types/Article.tsx';
import { ArticleAPI } from '../api/ArticleAPI.tsx';
dayjs.locale('fr');

interface DishContextI {
    selectedDish: Dish | null,
    setSelectedDish: React.Dispatch<React.SetStateAction<Dish|null>>
    articles: Article[],
}

export const DishContext = createContext<DishContextI>({} as DishContextI);

export default function DishPage() {
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        ArticleAPI.getAll().then(r => setArticles(r));
    }, []);

    return (
        <DishContext.Provider value={{selectedDish, setSelectedDish, articles}}>
            <div className={'h-screen flex flex-col gap-2 relative overflow-hidden w-full'}>
                <div className={'bg-gradient-to-br from-primary to-primary/85 from-10% text-secondary-content font-semibold text-xl px-2 py-1 h-12 flex items-center'}>
                    Liste des plats
                </div>

                <List/>

                <SlideUpModal
                    displayCondition={selectedDish !== null}
                    handleClose={() => {
                        setSelectedDish(null)
                    }}
                    headerContent={<Header/>}
                    bodyContent={<Body/>}
                />
            </div>
        </DishContext.Provider>
);
}
