import DateSelect from "../components/PlanningRepas/DateSelect.tsx";
import PlanningRepas from "../components/PlanningRepas/PlanningRepas.tsx";
import {createContext, useState} from "react";

interface PlanningRepasContextI {
    date: string,
    setDate: React.Dispatch<React.SetStateAction<string>>
}

export const PlanningRepasContext = createContext<PlanningRepasContextI>({} as PlanningRepasContextI)

export default function PlanningRepasPage() {
    const [date, setDate] = useState<string>('')

    const mainContext = {date, setDate};

    return (
        <PlanningRepasContext.Provider value={mainContext}>
            <div className={'h-full flex flex-col'}>
                <DateSelect/>

                <PlanningRepas/>
            </div>
        </PlanningRepasContext.Provider>
    );
}
