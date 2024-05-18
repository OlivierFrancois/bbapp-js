import MealPlan from "../../interfaces/MealPlan.tsx";
import {useContext} from "react";
import {MealPlanContext} from "../../routes/MealPlanPage.tsx";

interface CellProps {
    date: string,
    moment: string,
    mealPlan?: MealPlan,
}

export default function Cell({date, moment, mealPlan}: CellProps) {
    const {setSelectedCell} = useContext(MealPlanContext);

    const handleClick = () => {
        setSelectedCell({
            date: date,
            moment: moment,
            mealPlan: mealPlan,
        })
    }

    return <div onClick={handleClick} className={'p-2 h-full flex items-start flex-wrap gap-1 hover:bg-gray-50 cursor-pointer'}>
        {mealPlan?.meals.map((meal, key) => (
            <div key={key} className={'bg-slate-200 hover:bg-slate-300 cursor-pointer px-2 text-center rounded-full first-letter:uppercase text-nowrap overflow-hidden text-ellipsis'}>{meal.name}</div>
            ))
        }
    </div>
}