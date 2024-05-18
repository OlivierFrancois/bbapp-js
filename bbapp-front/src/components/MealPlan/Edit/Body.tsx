import {useContext, useEffect, useRef, useState} from "react";
import {MealPlanContext} from "../../../routes/MealPlanPage.tsx";
import Meal from "../../../interfaces/Meal.tsx";
import MealItem from "./MealItem.tsx";
import MealAdder from "./MealAdder.tsx";
import {MealPlanAPI} from "../../../api/MealPlanAPI.tsx";

export default function Body() {
    const {selectedCell} = useContext(MealPlanContext)

    const [meals, setMeals] = useState<Meal[]>(selectedCell?.mealPlan?.meals ?? [])
    const [mealAdder, setMealAdder] = useState<boolean>(false);
    const hasBeenRendered = useRef(false);

    // TODO : ask benjamin
    useEffect(() => {
        if (hasBeenRendered.current) {
            save()
        }
        hasBeenRendered.current = true;
    }, [meals]);

    if (!selectedCell) return <div></div>;

    const handleAddMealInput = () => {
        setMealAdder(true);
    }
    const handleMealSave = (meal: Meal|null) => {
        setMealAdder(false);
        if (meal) {
            setMeals([...meals, meal]);
        }
    };
    const handleMealRemove = (meal: Meal) => {
        setMeals(meals.filter(p => p.id !== meal.id));
    };

    const save = () => {
        const mealIds = meals.map(p => p.id)
        const payload = {
            mealIds: mealIds,
            date: selectedCell.date,
            moment: selectedCell.moment
        }
        MealPlanAPI.save(payload)
            .then(() => {
                //console.log(r)
            });
    }

    return (
        <div className={'p-3'}>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <div className={'font-semibold'}>Meals du repas</div>

                    {!mealAdder &&
                        <button onClick={handleAddMealInput} className="btn btn-primary btn-xs">Ajouter</button>
                    }
                </div>

                <div className={'flex flex-col divide-y'}>
                    {meals.map((meal, k) => <MealItem key={k} handleMealRemove={handleMealRemove} meal={meal}/>)}

                    {mealAdder && <MealAdder handleMealSave={handleMealSave}/>}
                </div>
            </div>
        </div>
    )
}