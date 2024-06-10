import Dish from "../../../interfaces/Dish.tsx";
import {TrashIcon} from "@heroicons/react/16/solid";

interface Props {
    dish: Dish
    handleDishRemove: (dish: Dish) => void
}

export default function DishItem({dish, handleDishRemove}: Props) {

    return (
        <div className="flex items-center justify-between py-1">
            <div className={'first-letter:uppercase'}>{dish.name}</div>

            <div onClick={() => handleDishRemove(dish)}>
                <TrashIcon className={'size-5'}/>
            </div>
        </div>
    )
}