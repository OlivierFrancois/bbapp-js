import React, {useState} from "react";
import {MealAPI} from "../../../api/MealAPI.tsx";
import Meal from "../../../interfaces/Meal.tsx";
import {XMarkIcon} from "@heroicons/react/16/solid";

interface MealAdderProps {
    handleMealSave: (meal: Meal|null) => void
}

export default function MealAdder({handleMealSave}: MealAdderProps) {
    const [mealInput, setMealInput] = useState<string>('')
    const [meals, setMeals] = useState<Meal[]>([])

    const handleInput = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setMealInput(target.value);
        if (target.value.length > 0) {
            MealAPI.getByName({name: target.value})
                .then(res => {
                    setMeals(res);
                })
        } else {
            setMeals([]);
        }
    }

    const handleCreateMeal = () => {
        const payload = {id: 0, name: mealInput}
        MealAPI.save(payload)
            .then(meal => {
                handleMealSave(meal);
            })
    }

    return (
        <div className={'py-1 flex items-center gap-5'}>
            <div className={'relative flex-1'}>
                <input type="text"
                       onInput={handleInput}
                       placeholder={'Recherchez un plat'}
                       value={mealInput}
                       className="input input-sm w-full input-bordered "/>

                {meals.length > 0
                    ? <div className={'absolute top-100 w-full border border-t-0 rounded'}>{meals.map((p, k) => (
                        <div key={k} className={'first-letter:uppercase text-sm py-3 px-2 border-t hover:bg-gray-50'} onClick={() => handleMealSave(p)}>{ p.name }</div>
                    ))}</div>
                    : mealInput.length >= 3 && <div onClick={handleCreateMeal} className={'absolute top-100 w-full border border-t-0 rounded text-sm py-1 px-2 border-t hover:bg-gray-50 italic'}>Créer le meal "<span className={'first-letter:uppercase font-medium'}>{mealInput}</span>"</div>
                }
            </div>

            <XMarkIcon onClick={() => handleMealSave(null)} className={'size-7'}></XMarkIcon>
        </div>
    )
}