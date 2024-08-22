import React, {useState} from "react";
import {DishAPI} from "../../../api/DishAPI.tsx";
import {Dish} from "../../../types/Dish.tsx";

interface DishAdderProps {
    handleDishSave: (dish: Dish | null) => void
}

export default function DishAdder({handleDishSave}: DishAdderProps) {
    const [dishInput, setDishInput] = useState<string>('')
    const [dishes, setDishes] = useState<Dish[]>([])

    const handleInput = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setDishInput(target.value);
        if (target.value.length > 0) {
            DishAPI.getByName({name: target.value})
                .then(res => {
                    setDishes(res);
                })
        } else {
            setDishes([]);
        }
    }

    const handleDishCreate = () => {
        const payload = {name: dishInput, url: ''}
        DishAPI.create(payload)
            .then(dish => {
                handleDishSave(dish);
            })
    }

    return (
        <div className={'py-1 flex items-center gap-5'}>
            <div className={'relative flex-1'}>
                <input type="text"
                       autoFocus
                       onInput={handleInput}
                       placeholder={'Recherchez un plat'}
                       value={dishInput}
                       className="input input-sm w-full input-bordered "/>

                {(dishes.length > 0 || dishInput.length >= 3) &&
                    <div className={'absolute top-100 w-full border border-t-0 rounded'}>
                        {dishes.map((p, k) =>
                            <div key={k}
                                 className={'first-letter:uppercase text-sm py-3 px-2 border-t hover:bg-gray-50'}
                                 onClick={() => handleDishSave(p)}>{p.name}
                            </div>
                        )}

                        {(dishInput.length >= 3) && !dishes.some(dish => dish.name.toLowerCase() === dishInput.toLowerCase()) &&(
                            <div onClick={handleDishCreate}
                                 className={'text-sm py-3 px-2 border-t hover:bg-gray-50 italic'}>
                                Créer le plat "<span className={'first-letter:uppercase font-medium'}>{dishInput}</span>"
                            </div>
                        )}
                    </div>
                }
            </div>

            <button className={'btn btn-ghost btn-square btn-sm'}>
                <i className={'fa fa-times text-2xl'}></i>
            </button>
        </div>
    )
}