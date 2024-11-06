import { useContext } from 'react';
import { Dish } from '../../../../types/Dish.tsx';
import { DishEditContext } from '../edit.modal.tsx';

interface EditDishHeaderProps {
    dish: Dish;
}

export default function DishEditHeader({ dish }: EditDishHeaderProps) {
    const { editMod, setEditMod } = useContext(DishEditContext);
    return (
        <div className="flex justify-between items-center">
            <div className={'font-bold text-xl first-letter:uppercase'}>{dish.name}</div>

            <button className="btn btn-ghost btn-circle" onClick={() => setEditMod(!editMod)}>
                <i className={`transition-transform fa-2x fa fa-gear ${editMod && 'rotate-45'}`}></i>
            </button>
        </div>
    );
}