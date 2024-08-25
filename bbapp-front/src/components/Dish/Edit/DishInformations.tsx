import React, { useContext  } from 'react';
import { Dish } from '../../../types/Dish.tsx';
import { DishContext } from '../../../routes/DishPage.tsx';

interface DishInformationsProps {
    dish: Dish
    setDish: React.Dispatch<React.SetStateAction<Dish | null>>
}

export default function DishInformations({dish, setDish} : DishInformationsProps) {
    const { selectedDish } = useContext(DishContext);

    if (!selectedDish || !dish) return <div>UNKNOWN</div>;

    const handleDishNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDish({ ...dish, name: target.value });
    };
    const handleDishUrlChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDish({ ...dish, url: target.value });
    };

    return <div className={'p-2 flex flex-col gap-3'}>
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