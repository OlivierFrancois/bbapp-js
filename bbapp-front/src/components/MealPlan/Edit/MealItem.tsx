import Meal from "../../../interfaces/Meal.tsx";
import {TrashIcon} from "@heroicons/react/16/solid";

interface Props {
    meal: Meal
    handleMealRemove: (meal: Meal) => void
}

export default function MealItem({meal, handleMealRemove}: Props) {

    return (
        <div className="flex items-center justify-between py-1">
            <div className={'first-letter:uppercase'}>{meal.name}</div>

            <div onClick={() => handleMealRemove(meal)}>
                <TrashIcon className={'size-5'}/>
            </div>
        </div>
    )
}