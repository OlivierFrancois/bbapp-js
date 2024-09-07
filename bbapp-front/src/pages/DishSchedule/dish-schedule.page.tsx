import DateSelectComponent from "./components/date-select.component.tsx";
import ScheduleComponent from "./components/schedule.component.tsx";
import React, {createContext, useState} from "react";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
import {DishScheduleItem} from "../../types/DishScheduleItem.tsx";
import SlideUpModal from "../../components/SlideUpModal/SlideUpModal.tsx";
import HeaderComponent from "./components/edit/header.component.tsx";
import BodyComponent from "./components/edit/body.component.tsx";
dayjs.locale('fr');

interface SelectedCell {
    date: string,
    moment: string,
    dishScheduleItem?: DishScheduleItem,
}

interface SwapItem {
    date: string,
    moment: string,
    dishScheduleItem?: DishScheduleItem,
}

interface DishScheduleContextI {
    date: string,
    setDate: React.Dispatch<React.SetStateAction<string>>,
    selectedCell: SelectedCell | null,
    setSelectedCell: React.Dispatch<React.SetStateAction<SelectedCell|null>>,
    swapItem1: SwapItem | null,
    setSwapItem1: React.Dispatch<React.SetStateAction<SwapItem|null>>,
    swapItem2: SwapItem | null,
    setSwapItem2: React.Dispatch<React.SetStateAction<SwapItem|null>>,
    swapMod: boolean,
    setSwapMod: React.Dispatch<React.SetStateAction<boolean>>,

}

const LS_DATE = 'BBAPP_DISH_SCHEDULE_DATE';

export const DishScheduleContext = createContext<DishScheduleContextI>({} as DishScheduleContextI)

export default function DishSchedulePage() {
    const LS_date = localStorage.getItem(LS_DATE) ? localStorage.getItem(LS_DATE) as string : dayjs().format('YYYY-MM-DD');

    const [date, setDate] = useState<string>(LS_date);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null)
    const [swapItem1, setSwapItem1] = useState<SwapItem|null>(null)
    const [swapItem2, setSwapItem2] = useState<SwapItem|null>(null)
    const [swapMod, setSwapMod] = useState<boolean>(false)

    const mainContext = {date, setDate, selectedCell, setSelectedCell, swapMod, setSwapMod, swapItem1, setSwapItem1, swapItem2, setSwapItem2};

    return (
        <DishScheduleContext.Provider value={mainContext}>
            <div className={'min-h-screen flex flex-col relative overflow-hidden'}>
                <DateSelectComponent/>

                <ScheduleComponent/>

                <SlideUpModal
                    displayCondition={selectedCell !== null}
                    handleClose={() => {setSelectedCell(null)}}
                    headerContent={<HeaderComponent/>}
                    bodyContent={<BodyComponent />}
                />
                <div className={'h-[4.5rem]'}></div>
            </div>
        </DishScheduleContext.Provider>
    );
}
