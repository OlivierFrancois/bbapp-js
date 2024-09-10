import {useContext} from "react";
import {DishContext} from "../dish.page.tsx";
import {Dish} from "../../../types/Dish.tsx";

export default function DishList() {
    const {setSelectedDish, dishes} = useContext(DishContext);


    const handleDishCreate = () => {
        const dish: Dish = {id: 0, name: ''};
        setSelectedDish(dish);
    }


    return <div className={'overflow-auto'}>
        <table className={'table table-sm table-pin-rows'}>
            <thead>
                <tr>
                    <th className={'text-base text-neutral'}>Plats</th>
                    <th className={'w-28'}>
                        <button onClick={handleDishCreate} className={'btn btn-xs btn-primary'}>Nouveau plat</button>
                    </th>
                </tr>
            </thead>

            <tbody>
                {dishes
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((dish, key) => (
                        <tr key={`${key}_${dish.id}`}>
                            <td className={'first-letter:uppercase'}>{dish.name}</td>

                            <td>
                                <div className="flex items-center justify-center gap-2">
                                    <button className="btn btn-secondary btn-xs btn-outline btn-circle"
                                            onClick={() => setSelectedDish(dish)}>
                                        <i className={'fa fa-pen'}></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <div className={'h-[4.5rem]'}></div>
    </div>
}