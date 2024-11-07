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
        <div className="flex-1 flex flex-col gap-6">
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

                    <input
                        onInput={handleDishUrlChange}
                        type="text"
                        className={'input input-sm input-bordered flex-1'}
                        value={editedDish.url ?? ''}
                    />
                </label>

                <button onClick={handleSave} className={'hidden btn btn-error btn-outline btn-sm mt-4'}>
                    Supprimer
                </button>
            </div>

            <hr />

            <div className="flex flex-col gap-2 ">
                <div className="flex justify-between items-center">
                    <h3 className={'font-semibold'}>Ingrédients</h3>

                    <button className={'btn btn-xs btn-neutral'}>Ajouter</button>
                </div>

                <table className={'table table-xs'}>
                    <thead>
                        <tr>
                            <th>Ingrédient</th>
                            <th>Quantité</th>
                            <th>Unité</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Café</td>
                            <td>30</td>
                            <td>cl</td>
                        </tr>

                        <tr>
                            <td>Farine</td>
                            <td>500</td>
                            <td>g</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <hr />

            <div className="flex justify-end gap-3">
                <button onClick={() => setEditMod(false)} className={'btn btn-neutral btn-ghost btn-sm'}>
                    Annuler
                </button>

                <button onClick={handleSave} className={'btn btn-primary btn-sm'}>
                    Sauvegarder
                </button>
            </div>
        </div>
    );
}
