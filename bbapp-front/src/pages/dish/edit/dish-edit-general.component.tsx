import React from 'react';
import { Dish } from '../../../types/Dish.tsx';

interface EditDishProps {
    editedDish: Dish;
    setEditedDish: React.Dispatch<React.SetStateAction<Dish>>;
}

export default function DishEditGeneral({ editedDish, setEditedDish }: EditDishProps) {
    const handleDishNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setEditedDish({ ...editedDish, name: target.value });
    };
    const handleDishUrlChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setEditedDish({ ...editedDish, url: target.value });
    };
    const handleDishCommentChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedDish({ ...editedDish, comment: target.value });
    };

    return (
        <div className="flex flex-col gap-2 ">
            <div className="font-semibold">Informations générales</div>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Nom du plat</span>
                </div>

                <input onInput={handleDishNameChange} type="text" className={'input input-sm input-bordered flex-1'} value={editedDish.name} />
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">URL</span>
                </div>

                <input onInput={handleDishUrlChange} type="text" className={'input input-sm input-bordered flex-1'} value={editedDish.url ?? ''} />
            </label>

            <label className="form-control w-full">Commentaire</label>
            <textarea onInput={handleDishCommentChange} className={'textarea h-40 textarea-xs textarea-bordered'}>
                {editedDish.comment}
            </textarea>
        </div>
    );
}
