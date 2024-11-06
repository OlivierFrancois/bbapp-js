import React, { useContext, useState } from 'react';
import { Dish } from '../../../../types/Dish.tsx';
import { DishAPI } from '../../../../lib/api/DishAPI.tsx';
import { toast } from 'react-toastify';
import { DishEditContext } from '../edit.modal.tsx';

interface EditDishProps {
    dish: Dish;
}

export default function DishEditGeneral({ dish }: EditDishProps) {
    const { setEditMod, onDishSave, reloadDish } = useContext(DishEditContext);

    const [editedDish, setEditedDish] = useState<Dish>(dish);

    const handleDishNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setEditedDish({ ...editedDish, name: target.value });
    };
    const handleDishUrlChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setEditedDish({ ...editedDish, url: target.value });
    };

    const handleSave = () => {
        DishAPI.update(editedDish, [])
            .then(() => {
                toast.success('Plat mis à jour !');
                setEditMod(false);
                reloadDish();
                if (onDishSave) {
                    onDishSave();
                }
            })
            .catch(() => {
                toast.error('Une erreur est survenue.');
            });
    };

    return (
        <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-4 flex-1">
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

                    <input
                        onInput={handleDishUrlChange}
                        type="text"
                        className={'input input-sm input-bordered flex-1'}
                        value={editedDish.url ?? ''}
                    />
                </label>

                <div className="flex justify-between items-center gap-2">
                    <button onClick={() => setEditedDish(dish)} className={'flex-1 btn btn-neutral btn-outline btn-sm'}>
                        Annuler
                    </button>
                    <button onClick={handleSave} className={'flex-1 btn btn-primary btn-sm'}>
                        Sauvegarder
                    </button>
                </div>
            </div>

            <button className={'btn btn-outline btn-error btn-sm'}>Supprimer le plat</button>
        </div>
    );
}
