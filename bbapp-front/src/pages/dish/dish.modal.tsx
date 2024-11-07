import { Dish } from '../../types/Dish.tsx';
import { useCallback, useEffect, useState } from 'react';
import DishHeader from './edit/header.component.tsx';
import DishEdit from './edit/dish-edit.component.tsx';
import { DishAPI } from '../../lib/api/DishAPI.tsx';
import { DishContext } from './dish.context.tsx';
import { Article } from '../../types/Article.tsx';
import { ArticleAPI } from '../../lib/api/ArticleAPI.tsx';
import DishView from './view/dish-view.component.tsx';

interface EditDishProps {
    givenDish: Dish;
    onDishSave?: () => void;
}

export default function DishModal({ givenDish, onDishSave }: EditDishProps) {
    const [editMod, setEditMod] = useState(false);
    const [dish, setDish] = useState<Dish>(givenDish);
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        reloadArticles();
        DishAPI.get(dish.id).then((res) => setDish(res));
    }, [givenDish]);

    const reloadArticles = useCallback(() => {
        ArticleAPI.getAll().then((res) => setArticles(res));
    }, []);

    const reloadDish = () => {
        DishAPI.get(dish.id).then((res) => setDish(res));
    };

    return (
        <DishContext.Provider value={{ dish, editMod, setEditMod, reloadDish, reloadArticles, onDishSave, articles }}>
            <div className={'h-full flex flex-col gap-2'}>
                <DishHeader dish={dish} />

                <hr />

                {editMod ? <DishEdit dish={dish} /> : <DishView dish={dish} />}
            </div>
        </DishContext.Provider>
    );
}
