import DateSelect from "../components/PlanningRepas/DateSelect.tsx";
import Planning from "../components/PlanningRepas/Planning.tsx";
import Cache from "../components/PlanningRepas/Cache.tsx";
import React, {createContext, useState} from "react";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
import Edit from "../components/PlanningRepas/Edit/Edit.tsx";
import PlanningRepas from "../interfaces/PlanningRepas.tsx";
dayjs.locale('fr');

interface SelectedCell {
    date: string,
    moment: string,
    planningRepas?: PlanningRepas,
}

interface PlanningRepasContextI {
    date: string,
    setDate: React.Dispatch<React.SetStateAction<string>>
    selectedCell: SelectedCell | null
    setSelectedCell: React.Dispatch<React.SetStateAction<SelectedCell|null>>
}

const LS_DATE = 'BBAPP_PLANNING_REPAS_DATE';

export const PlanningRepasContext = createContext<PlanningRepasContextI>({} as PlanningRepasContextI)

export default function PlanningRepasPage() {
    const LS_date = localStorage.getItem(LS_DATE) ? localStorage.getItem(LS_DATE) as string : dayjs().format('YYYY-MM-DD');

    const [date, setDate] = useState<string>(LS_date);
    const [selectedCell, setSelectedCell] = useState<SelectedCell>(null)

    const mainContext = {date, setDate, selectedCell, setSelectedCell};

    return (
        <PlanningRepasContext.Provider value={mainContext}>
            <div className={'h-full flex flex-col relative overflow-hidden'}>
                <Cache/>

                <DateSelect/>

                <Planning/>

                <Edit/>

            </div>
        </PlanningRepasContext.Provider>
    );
}
