import {Dish} from "../../../../types/Dish.tsx";

interface Props {
    dish: Dish
    handleDishRemove: (dish: Dish) => void
}

export default function DishItemComponent({dish, handleDishRemove}: Props) {

    return (
        <div className="flex items-center justify-between py-1">
            <div className={'first-letter:uppercase'}>{dish.name}</div>

            <button className={'btn btn-ghost btn-square btn-sm'} onClick={() => handleDishRemove(dish)}>
                <i className={'fa fa-trash'}></i>
            </button>
        </div>
    )
}