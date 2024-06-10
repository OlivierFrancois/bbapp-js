import {useContext, useEffect, useRef, useState} from "react";
import {DishScheduleContext} from "../../../routes/DishSchedulePage.tsx";
import Dish from "../../../interfaces/Dish.tsx";
import DishItem from "./DishItem.tsx";
import DishAdder from "./DishAdder.tsx";
import {DishScheduleAPI} from "../../../api/DishScheduleAPI.tsx";

export default function Body() {
    const {selectedCell} = useContext(DishScheduleContext)

    const [dishes, setDishes] = useState<Dish[]>(selectedCell?.dishScheduleItem?.dishes ?? [])
    const [dishAdder, setDishAdder] = useState<boolean>(false);
    const hasBeenRendered = useRef(false);

    // TODO : ask benjamin
    useEffect(() => {
        if (hasBeenRendered.current) {
            save()
        }
        hasBeenRendered.current = true;
    }, [dishes]);

    if (!selectedCell) return <div></div>;

    const handleAddDishInput = () => {
        setDishAdder(true);
    }
    const handleDishSave = (dish: Dish|null) => {
        setDishAdder(false);
        if (dish) {
            setDishes([...dishes, dish]);
        }
    };
    const handleDishRemove = (dish: Dish) => {
        setDishes(dishes.filter(p => p.id !== dish.id));
    };

    const save = () => {
        const dishIds = dishes.map(p => p.id)
        const payload = {
            dishIds: dishIds,
            date: selectedCell.date,
            moment: selectedCell.moment
        }
        DishScheduleAPI.save(payload)
            .then(() => {
                //console.log(r)
            });
    }

    return (
        <div className={'p-3'}>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <div className={'font-semibold'}>Plats du repas</div>

                    {!dishAdder &&
                        <button onClick={handleAddDishInput} className="btn btn-primary btn-xs">Ajouter</button>
                    }
                </div>

                <div className={'flex flex-col divide-y'}>
                    {dishes.map((dish, k) => <DishItem key={k} handleDishRemove={handleDishRemove} dish={dish}/>)}

                    {dishAdder && <DishAdder handleDishSave={handleDishSave}/>}
                </div>
            </div>
        </div>
    )
}