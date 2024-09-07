import React, { useContext  } from 'react';
import { Dish } from '../../../../types/Dish.tsx';
import { DishContext } from '../../dish.page.tsx';

interface DishInformationsProps {
    dish: Dish
    setDish: React.Dispatch<React.SetStateAction<Dish | null>>
}

export default function DishInformation({dish, setDish} : DishInformationsProps) {
    const { selectedDish, dishCategories } = useContext(DishContext);

    if (!selectedDish || !dish) return <div>UNKNOWN</div>;

    const handleDishNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDish({ ...dish, name: target.value });
    };
    const handleDishUrlChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDish({ ...dish, url: target.value });
    };
    const handleCategoryChange = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
        setDish({...dish, dishCategoryId: parseInt(target.value)});
    }

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
                       value={dish.url ?? ''} />
            </div>

            <div className={'flex items-center'}>
                <div className="font-medium w-28">Catégorie</div>
                <select onChange={handleCategoryChange} className={'select select-sm select-bordered flex-1'}
                        defaultValue={dish.dishCategoryId ?? 0}>
                    <option>Aucune</option>
                    {dishCategories.map((dishCategory, key) => <option key={key} value={dishCategory.id}>{dishCategory.name}</option>)}
                </select>
            </div>
        </div>
    </div>;
}