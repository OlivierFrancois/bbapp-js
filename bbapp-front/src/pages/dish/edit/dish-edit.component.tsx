import { useContext, useState } from 'react';
import { Dish } from '../../../types/Dish.tsx';
import { DishAPI } from '../../../lib/api/DishAPI.tsx';
import { toast } from 'react-toastify';
import { DishContext } from '../dish.context.tsx';
import DishEditRecipe from './dish-edit-recipe.component.tsx';
import DishEditGeneral from './dish-edit-general.component.tsx';
import RemoveDish from '../modals/remove-dish.modal.tsx';
import { useModalUp } from '../../../contexts/modal-up.provider.tsx';
import { useModal } from '../../../contexts/modal.provider.tsx';

interface EditDishProps {
    dish: Dish;
}

export default function DishEdit({ dish }: EditDishProps) {
    const { setEditMod, onDishSave, reloadDish } = useContext(DishContext);

    const [editedDish, setEditedDish] = useState<Dish>(dish);
    const { openModal, closeModal } = useModal();
    const { closeModal: closeModalUp } = useModalUp();

    const handleSave = () => {
        DishAPI.update(editedDish)
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

    const handleDelete = () => {
        DishAPI.delete(editedDish.id)
            .then(() => {
                toast.success('Plat supprimé !');
                closeModal();
                closeModalUp();
            })
            .catch(() => {
                toast.error('Une erreur est survenue.');
            });
        closeModal();
    };

    return (
        <div className="flex-1 flex flex-col gap-6 py-1">
            <DishEditGeneral editedDish={editedDish} setEditedDish={setEditedDish} />

            <hr />

            <DishEditRecipe editedDish={editedDish} setEditedDish={setEditedDish} />

            <hr />

            <button
                className={'btn btn-error btn-sm'}
                onClick={() => openModal(<RemoveDish handleRemoveDish={handleDelete} dish={dish} />, 'overflow-visible')}
            >
                Supprimer
            </button>

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
