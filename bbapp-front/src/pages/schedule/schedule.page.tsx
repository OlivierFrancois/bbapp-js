import ScheduleHeader from './components/header.component.tsx';
import dayjs from 'dayjs';
import React, { createContext, useState } from 'react';
import ScheduleBody from './components/body.component.tsx';

const LS_DATE = 'BBAPP_DISH_SCHEDULE_DATE';

interface DishScheduleContextI {
    date: string;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    // selectedCell: SelectedCell | null;
    // setSelectedCell: React.Dispatch<React.SetStateAction<SelectedCell | null>>;
    // swapItem1: SwapItem | null;
    // setSwapItem1: React.Dispatch<React.SetStateAction<SwapItem | null>>;
    // swapItem2: SwapItem | null;
    // setSwapItem2: React.Dispatch<React.SetStateAction<SwapItem | null>>;
    //  swapMod: boolean;
    // setSwapMod: React.Dispatch<React.SetStateAction<boolean>>;
}
export const DishScheduleContext = createContext<DishScheduleContextI>({} as DishScheduleContextI);

export default function SchedulePage() {
    const LS_date = localStorage.getItem(LS_DATE) ? (localStorage.getItem(LS_DATE) as string) : dayjs().format('YYYY-MM-DD');
    const [date, setDate] = useState<string>(LS_date);

    return (
        <DishScheduleContext.Provider value={{ date, setDate }}>
            <div>
                <ScheduleHeader />
                <ScheduleBody />
            </div>
        </DishScheduleContext.Provider>
    );
}
