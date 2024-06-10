import React, {useState} from "react";
import {DishAPI} from "../../../api/DishAPI.tsx";
import Dish from "../../../interfaces/Dish.tsx";
import {XMarkIcon} from "@heroicons/react/16/solid";

interface DishAdderProps {
    handleDishSave: (dish: Dish|null) => void
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
        const payload = {id: 0, name: dishInput}
        DishAPI.save(payload)
            .then(dish => {
                handleDishSave(dish);
            })
    }

    return (
        <div className={'py-1 flex items-center gap-5'}>
            <div className={'relative flex-1'}>
                <input type="text"
                       onInput={handleInput}
                       placeholder={'Recherchez un plat'}
                       value={dishInput}
                       className="input input-sm w-full input-bordered "/>

                {dishes.length > 0
                    ? <div className={'absolute top-100 w-full border border-t-0 rounded'}>{dishes.map((p, k) => (
                        <div key={k} className={'first-letter:uppercase text-sm py-3 px-2 border-t hover:bg-gray-50'} onClick={() => handleDishSave(p)}>{ p.name }</div>
                    ))}</div>
                    : dishInput.length >= 3 && <div onClick={handleDishCreate} className={'absolute top-100 w-full border border-t-0 rounded text-sm py-1 px-2 hover:bg-gray-50 italic'}>Créer le plat "<span className={'first-letter:uppercase font-medium'}>{dishInput}</span>"</div>
                }
            </div>

            <XMarkIcon onClick={() => handleDishSave(null)} className={'size-7'}></XMarkIcon>
        </div>
    )
}