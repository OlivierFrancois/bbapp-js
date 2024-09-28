import {Dish} from "../../../../types/Dish.tsx";

interface Props {
    dish: Dish
    handleDishRemove: (dish: Dish) => void
}

export default function DishItem({dish, handleDishRemove}: Props) {

    return (
        <div className="flex items-center justify-between py-1">
            <div className={'first-letter:uppercase'}>{dish.name}</div>

            <div className="flex items-center gap-1">
                {dish.url &&
                    <a className={'btn btn-ghost btn-square btn-sm'} href={dish.url} target={'_blank'}>
                        <i className={'fa fa-book-open'}></i>
                    </a>
                }

                <button className={'btn btn-ghost btn-square btn-sm'} onClick={() => handleDishRemove(dish)}>
                    <i className={'fa fa-trash'}></i>
                </button>
            </div>
        </div>
    )
}