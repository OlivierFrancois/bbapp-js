import dayjs from "dayjs";
import 'dayjs/locale/fr';
import ListComponent from "./components/list.component.tsx";
import React, { createContext, useEffect, useState } from 'react';
import {Dish} from "../../types/Dish.tsx";
import DishHeader from "./components/edit/dish-header.component.tsx";
import Body from "./components/edit/body.component.tsx";
import { Article } from '../../types/Article.tsx';
import { ArticleAPI } from '../../api/ArticleAPI.tsx';
import SlideUpModal from "../../components/slide-up-modal/slide-up-modal.component.tsx";
dayjs.locale('fr');

interface DishContextI {
    selectedDish: Dish | null,
    setSelectedDish: React.Dispatch<React.SetStateAction<Dish|null>>
    articles: Article[],
    refreshArticles: () => void,
}

export const DishContext = createContext<DishContextI>({} as DishContextI);

export default function DishPage() {
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const refreshArticles = () => ArticleAPI.getAll().then(r => setArticles(r));

    useEffect(() => {
        refreshArticles();
    }, []);

    return (
        <DishContext.Provider value={{selectedDish, setSelectedDish, articles, refreshArticles}}>
            <div className={'h-screen flex flex-col gap-2 relative overflow-hidden w-full'}>
                <div className={'bg-gradient-to-br from-primary to-primary/85 from-10% text-secondary-content font-semibold text-xl px-2 py-1 h-12 flex items-center'}>
                    Liste des plats
                </div>

                <ListComponent/>

                <SlideUpModal
                    displayCondition={selectedDish !== null}
                    handleClose={() => {
                        setSelectedDish(null)
                    }}
                    headerContent={<DishHeader/>}
                    bodyContent={<Body/>}
                />
            </div>
        </DishContext.Provider>
);
}
