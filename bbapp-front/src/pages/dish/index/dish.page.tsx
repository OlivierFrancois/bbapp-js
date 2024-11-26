import DishIndexHeader from './components/header.component.tsx';
import { DishIndexContext } from '../dish.context.tsx';
import { useEffect, useState } from 'react';
import { Dish } from '../../../types/Dish.tsx';
import { DishAPI } from '../../../lib/api/DishAPI.tsx';
import DishIndexBody from './components/body.component.tsx';

export default function DishPage() {
    const [dishes, setDishes] = useState<Dish[]>([]);

    const reloadDishes = () => {
        DishAPI.getAll().then((res) => setDishes(res));
    };

    useEffect(() => {
        reloadDishes();
    }, []);

    const context = {
        dishes,
        reloadDishes,
    };

    return (
        <DishIndexContext.Provider value={context}>
            <div className={'pb-14'}>
                <DishIndexHeader />

                <DishIndexBody />
            </div>
        </DishIndexContext.Provider>
    );
}
