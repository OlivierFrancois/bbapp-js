import DateSelect from "../components/MealPlan/DateSelect.tsx";
import Planner from "../components/MealPlan/Planner.tsx";
import Cache from "../components/MealPlan/Cache.tsx";
import React, {createContext, useState} from "react";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
import Edit from "../components/MealPlan/Edit/Edit.tsx";
import MealPlan from "../interfaces/MealPlan.tsx";
dayjs.locale('fr');

interface SelectedCell {
    date: string,
    moment: string,
    mealPlan?: MealPlan,
}

interface MealPlanContextI {
    date: string,
    setDate: React.Dispatch<React.SetStateAction<string>>
    selectedCell: SelectedCell | null
    setSelectedCell: React.Dispatch<React.SetStateAction<SelectedCell|null>>
}

const LS_DATE = 'BBAPP_MEAL_PLAN_DATE';

export const MealPlanContext = createContext<MealPlanContextI>({} as MealPlanContextI)

export default function MealPlanPage() {
    const LS_date = localStorage.getItem(LS_DATE) ? localStorage.getItem(LS_DATE) as string : dayjs().format('YYYY-MM-DD');

    const [date, setDate] = useState<string>(LS_date);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null)

    const mainContext = {date, setDate, selectedCell, setSelectedCell};

    return (
        <MealPlanContext.Provider value={mainContext}>
            <div className={'min-h-screen flex flex-col relative overflow-hidden'}>
                <Cache/>

                <DateSelect/>

                <Planner/>

                <Edit/>

                <div className={'h-[4.5rem]'}></div>
            </div>
        </MealPlanContext.Provider>
    );
}
