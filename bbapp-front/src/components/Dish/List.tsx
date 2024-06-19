import {useContext, useEffect, useState} from "react";
import Dish from "../../interfaces/Dish.tsx";
import {DishAPI} from "../../api/DishAPI.tsx";
import {PencilIcon} from "@heroicons/react/16/solid";
import {DishContext} from "../../routes/DishPage.tsx";

export default function List() {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const {setSelectedDish} = useContext(DishContext);

    useEffect(() => {
        DishAPI.getAll()
            .then(fetchedDishes => setDishes(fetchedDishes));
    })

    const handleClickCreate = () => {
        const dish: Dish = {id: 0, name: ''};
        setSelectedDish(dish);
    }

    return <table className={'table table-sm table-pin-rows'}>
        <thead className={'text-lg'}>
            <tr>
                <th className={'w-full'}>Plat</th>

                <th>
                    <button onClick={handleClickCreate} className={'btn btn-primary btn-sm'}>Nouveau</button>
                </th>
            </tr>
        </thead>

        <tbody>
            {dishes
                .sort((a,b) => a.name.localeCompare(b.name))
                .map((dish: Dish, key) => (
                <tr key={`${key}_${dish.id}`}>
                    <td className={' first-letter:uppercase'}>{dish.name}</td>

                    <td>
                        <div className="flex items-center justify-end gap-2">
                            <PencilIcon
                                className={'size-5'}
                                onClick={() => setSelectedDish(dish)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
}