import { Moment } from '../../../types/Moment.tsx';
import { Dish } from '../../../types/Dish.tsx';
import { useModal } from '../../../contexts/modal.provider.tsx';
import { Dayjs } from 'dayjs';

interface RemoveDishProps {
    date: Dayjs;
    moment: Moment;
    dish: Dish;
    handleRemoveDish: (dishId: number) => void;
}

export default function RemoveDish({ date, moment, dish, handleRemoveDish }: RemoveDishProps) {
    const { closeModal } = useModal();

    return (
        <div className={'flex flex-col gap-2'}>
            <div className={'font-bold'}>
                Repas du {date.format('dddd DD/MM/YYYY')} {moment.name}
            </div>

            <hr />

            <div className={'flex flex-col gap-5'}>
                <div>
                    Souhaitez-vous vraiment supprimer le plat <span className={'font-bold'}>{dish.name}</span> de ce repas ?
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
        </div>
    );
}
