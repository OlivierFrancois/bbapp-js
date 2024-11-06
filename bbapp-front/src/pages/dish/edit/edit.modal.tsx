import { Dish } from '../../../types/Dish.tsx';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import DishEditHeader from './components/header.component.tsx';
import DishEditGeneral from './components/edit-general.component.tsx';
import { DishAPI } from '../../../lib/api/DishAPI.tsx';

interface EditDishProps {
    givenDish: Dish;
    onDishSave?: () => void;
}

export type DishEditContextT = {
    dish: Dish;
    editMod: boolean;
    setEditMod: Dispatch<SetStateAction<boolean>>;
    reloadDish: () => void;
    onDishSave?: () => void;
};

export const DishEditContext = createContext<DishEditContextT>({} as DishEditContextT);

export default function DishEdit({ givenDish, onDishSave }: EditDishProps) {
    const [editMod, setEditMod] = useState(true);

    const [dish, setDish] = useState<Dish>(givenDish);
    const reloadDish = () => {
        DishAPI.get(dish.id).then((res) => setDish(res));
    };

    return (
        <DishEditContext.Provider value={{ dish, editMod, setEditMod, reloadDish, onDishSave }}>
            <div className={'h-full flex flex-col gap-2'}>
                <DishEditHeader dish={dish} />

                <hr />

                <div className={'flex items-center gap-3 mb-3'}>
                    <button className="btn btn-primary btn-neutral btn-xs">Informations générales</button>
                    <button className="btn btn-outline btn-neutral btn-xs">Ingrédients</button>
                </div>

                {editMod ? (
                    <DishEditGeneral dish={dish} />
                ) : (
                    <pre className="w-full p-4 bg-gray-100 rounded-xl overflow-auto">{JSON.stringify(dish, null, '  ')}</pre>
                )}
            </div>
        </DishEditContext.Provider>
    );
}
