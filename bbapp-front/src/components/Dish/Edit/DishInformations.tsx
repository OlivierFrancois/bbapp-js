import React, { useContext, useEffect, useState } from 'react';
import { Dish } from '../../../types/Dish.tsx';
import { DishContext } from '../../../routes/DishPage.tsx';
import { DishAPI } from '../../../api/DishAPI.tsx';

export default function DishInformations() {
    const { selectedDish, setSelectedDish } = useContext(DishContext);

    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const [dish, setDish] = useState<Dish | null>(selectedDish);

    useEffect(() => {
        if (dish && selectedDish) {
            setHasChanged(dish.name !== selectedDish.name);
        }
    }, [dish, selectedDish]);

    if (!selectedDish || !dish) return <div>UNKNOWN</div>;

    const handleDishNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDish({ ...dish, name: target.value });
    };
    const handleDishUrlChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDish({ ...dish, url: target.value });
    };
    const handleCancelModification = () => {
        setDish(selectedDish);
    };

    const handleSaveDish = () => {
        if (dish.id > 0) {
            DishAPI.update(dish)
                .then(returnedDish => setSelectedDish(returnedDish));
        } else {
            DishAPI.create({ name: dish.name, url: dish.url } as Omit<Dish, 'id'>)
                .then(returnedDish => setSelectedDish(returnedDish));
        }
    };

    return <div className={'p-2 flex flex-col gap-3'}>
        <div className="flex items-center gap-2 justify-end">
            <button disabled={!hasChanged} onClick={handleCancelModification}
                    className={'btn btn-xs btn-secondary btn-outline'}>Annuler
            </button>
            <button disabled={!hasChanged} onClick={handleSaveDish} className={'btn btn-xs btn-primary'}>Sauvegarder
            </button>
        </div>

        <div className={'flex flex-col gap-2'}>
            <div className="font-semibold">Informations du plat</div>

            <div className={'flex items-center'}>
                <div className="font-medium w-28">Nom du plat</div>
                <input onInput={handleDishNameChange} type="text" className={'input input-sm input-bordered flex-1'}
                       value={dish.name} />
            </div>

            <div className={'flex items-center'}>
                <div className="font-medium w-28">URL</div>
                <input onInput={handleDishUrlChange} type="text" className={'input input-sm input-bordered flex-1'}
                       value={dish.url} />
            </div>
        </div>
    </div>;
}