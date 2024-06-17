import DateSelect from "../components/DishSchedule/DateSelect.tsx";
import Schedule from "../components/DishSchedule/Schedule.tsx";
import React, {createContext, useState} from "react";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
import DishScheduleItem from "../interfaces/DishScheduleItem.tsx";
import SlideUpModal from "../components/SlideUpModal/SlideUpModal.tsx";
import Header from "../components/DishSchedule/Edit/Header.tsx";
import Body from "../components/DishSchedule/Edit/Body.tsx";
dayjs.locale('fr');

interface SelectedCell {
    date: string,
    moment: string,
    dishScheduleItem?: DishScheduleItem,
}

interface DishScheduleContextI {
    date: string,
    setDate: React.Dispatch<React.SetStateAction<string>>
    selectedCell: SelectedCell | null
    setSelectedCell: React.Dispatch<React.SetStateAction<SelectedCell|null>>
}

const LS_DATE = 'BBAPP_DISH_SCHEDULE_DATE';

export const DishScheduleContext = createContext<DishScheduleContextI>({} as DishScheduleContextI)

export default function DishSchedulePage() {
    const LS_date = localStorage.getItem(LS_DATE) ? localStorage.getItem(LS_DATE) as string : dayjs().format('YYYY-MM-DD');

    const [date, setDate] = useState<string>(LS_date);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null)

    const mainContext = {date, setDate, selectedCell, setSelectedCell};

    return (
        <DishScheduleContext.Provider value={mainContext}>
            <div className={'min-h-screen flex flex-col relative overflow-hidden'}>
                <DateSelect/>

                <Schedule/>

                <SlideUpModal
                    displayCondition={selectedCell !== null}
                    handleClose={() => {setSelectedCell(null)}}
                    headerContent={<Header/>}
                    bodyContent={<Body />}
                />
                <div className={'h-[4.5rem]'}></div>
            </div>
        </DishScheduleContext.Provider>
    );
}
