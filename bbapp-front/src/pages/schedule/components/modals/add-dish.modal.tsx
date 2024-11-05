import { Moment } from '../../../../types/Moment.tsx';
import React, { useState } from 'react';
import { Dish } from '../../../../types/Dish.tsx';
import { DishAPI } from '../../../../lib/api/DishAPI.tsx';
import { Dayjs } from 'dayjs';

interface AddDishProps {
    date: Dayjs;
    moment: Moment;
    handleAddDish: (dishId: number) => void;
}

export default function AddDish({ date, moment, handleAddDish }: AddDishProps) {
    const [dishInput, setDishInput] = useState<string>('');
    const [dishes, setDishes] = useState<Dish[]>([]);

    const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDishInput(target.value);
        if (target.value.length > 0) {
            DishAPI.getByName({ name: target.value }).then((res) => {
                setDishes(res);
            });
        } else {
            setDishes([]);
        }
    };

    const clearModalBeforeHandleAddDish = (dishId: number) => {
        setDishInput('');
        setDishes([]);
        handleAddDish(dishId);
    };

    const handleDishCreate = () => {
        const payload = { name: dishInput, url: '' };
        DishAPI.create(payload).then((dish) => {
            clearModalBeforeHandleAddDish(dish.id);
        });
    };

    return (
        <div className={'flex flex-col gap-2'}>
            <div className={'font-bold'}>
                Repas du {date.format('dddd DD/MM/YYYY')} {moment.name}
            </div>

            <hr />

            <div className={'relative'}>
                <input
                    type="text"
                    autoFocus
                    onInput={handleInput}
                    placeholder={'Recherchez un plat à ajouter'}
                    value={dishInput}
                    className="input input-sm w-full input-bordered "
                />

                {(dishes.length > 0 || dishInput.length >= 3) && (
                    <div className={'absolute bg-white top-100 w-full border border-t-0 rounded'}>
                        {dishes.map(
                            (dish, k) =>
                                k <= 4 && (
                                    <div
                                        key={k}
                                        className={'first-letter:uppercase text-sm py-3 px-2 border-t hover:bg-gray-50'}
                                        onClick={() => clearModalBeforeHandleAddDish(dish.id)}
                                    >
                                        {dish.name}
                                    </div>
                                )
                        )}

                        {dishInput.length >= 3 && !dishes.some((dish) => dish.name.toLowerCase() === dishInput.toLowerCase()) && (
                            <div onClick={handleDishCreate} className={' text-sm py-3 px-2 border-t hover:bg-gray-50 italic'}>
                                Créer le plat "<span className={'first-letter:uppercase font-medium'}>{dishInput}</span>"
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
