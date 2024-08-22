import {useContext, useEffect, useState} from "react";
import {Dish} from "../../types/Dish.tsx";
import {DishAPI} from "../../api/DishAPI.tsx";
import {DishContext} from "../../routes/DishPage.tsx";

export default function List() {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const {selectedDish, setSelectedDish} = useContext(DishContext);

    useEffect(() => {
        DishAPI.getAll()
            .then(fetchedDishes => setDishes(fetchedDishes));
    }, [selectedDish])

    const handleClickCreate = () => {
        const dish: Dish = {id: 0, name: ''};
        setSelectedDish(dish);
    }

    return <div className={'overflow-auto'}>
        <table className={'table table-sm table-pin-rows'}>
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
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((dish: Dish, key) => (
                    <tr key={`${key}_${dish.id}`}>
                        <td className={' first-letter:uppercase'}>{dish.name}</td>

                        <td>
                            <div className="flex justify-end">
                                <div className="btn btn-secondary btn-xs btn-circle"
                                     onClick={() => setSelectedDish(dish)}>
                                    <i className={'fa fa-pen'} ></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className={'h-[4.5rem]'}></div>
    </div>
}