import DateSelect from "../components/PlanningRepas/DateSelect.tsx";
import PlanningRepas from "../components/PlanningRepas/PlanningRepas.tsx";
import {createContext, useState} from "react";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
dayjs.locale('fr');

interface PlanningRepasContextI {
    date: string,
    setDate: React.Dispatch<React.SetStateAction<string>>
}

const LS_DATE = 'BBAPP_PLANNING_REPAS_DATE';

export const PlanningRepasContext = createContext<PlanningRepasContextI>({} as PlanningRepasContextI)

export default function PlanningRepasPage() {
    const LS_date = localStorage.getItem(LS_DATE) ? localStorage.getItem(LS_DATE) as string : dayjs().format('YYYY-MM-DD');

    const [date, setDate] = useState<string>(LS_date);

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
