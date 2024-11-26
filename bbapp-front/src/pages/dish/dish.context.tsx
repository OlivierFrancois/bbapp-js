import { createContext, Dispatch, SetStateAction } from 'react';
import { Dish } from '../../types/Dish.tsx';
import { Article } from '../../types/Article.tsx';

export type DishEditContextT = {
    dish: Dish;
    editMod: boolean;
    setEditMod: Dispatch<SetStateAction<boolean>>;
    reloadDish: () => void;
    reloadArticles: () => void;
    onDishSave?: () => void;
    articles: Article[];
    countUses: number;
};
export const DishContext = createContext<DishEditContextT>({} as DishEditContextT);

type DishIndexContextT = {
    dishes: Dish[];
    reloadDishes: () => void;
};

export const DishIndexContext = createContext<DishIndexContextT>({} as DishIndexContextT);
