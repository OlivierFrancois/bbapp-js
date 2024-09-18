import {useContext} from "react";
import {DishContext} from "../dish.page.tsx";
import {Dish} from "../../../types/Dish.tsx";

export default function DishList() {
    const {setSelectedDish, dishes} = useContext(DishContext);


    const handleDishCreate = () => {
        const dish: Dish = {id: 0, name: '', dishTagIds: []};
        setSelectedDish(dish);
    }


    return <div className={'overflow-auto'}>
        <div className={'px-2 flex justify-between'}>
            <h2 className={'font-bold text-base text-neutral'}>Plats</h2>

            <button onClick={handleDishCreate} className={'btn btn-square btn-primary btn-sm btn-ghost'}>
                <i className={'fa fa-plus text-lg'}></i>
            </button>
        </div>

        <table className={'table table-sm table-pin-rows table-zebra'}>
            <tbody>
                {dishes
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((dish, key) => (
                        <tr key={`${key}_${dish.id}`} className={'hover border-t'}>
                            <td className={'w-10'}>{key + 1}</td>

                            <td className={'first-letter:uppercase cursor-pointer'}
                                onClick={() => setSelectedDish(dish)}
                            >
                                {dish.name}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <div className={'h-[4.5rem]'}></div>
    </div>
}