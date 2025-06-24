import { useModal } from "../../../contexts/modal.provider.tsx";
import { Dish } from "../../../types/Dish.tsx";

interface RemoveDishProps {
    dish: Dish;
    handleRemoveDish: (dishId: number) => void;
}

export default function RemoveDish({ dish, handleRemoveDish }: RemoveDishProps) {
    const { closeModal } = useModal();

    return (
        <div className={'flex flex-col gap-5'}>
            <div>
                Souhaitez-vous vraiment supprimer le plat <span className={'font-bold'}>{dish.name}</span> ?
            </div>

            <div className="grid grid-cols-2 gap-5">
                <button onClick={() => closeModal()} className="btn btn-sm btn-error btn-outline">
                    Annuler
                </button>

                <button onClick={() => handleRemoveDish(dish.id)} className="btn btn-sm btn-primary">
                    Confirmer
                </button>
            </div>
        </div>
    );
}
