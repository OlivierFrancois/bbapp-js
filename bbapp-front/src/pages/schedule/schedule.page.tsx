import ScheduleHeader from './components/header.component.tsx';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import ScheduleBody from './components/body.component.tsx';
import ScheduleActionBar from './components/action.component.tsx';
import { DishScheduleItem } from '../../types/DishScheduleItem.tsx';
import { DishScheduleAPI } from '../../lib/api/DishScheduleAPI.tsx';
import dayjs from '../../lib/dayjs.ts';

const LS_DATE = 'BBAPP_DISH_SCHEDULE_DATE';

export type ScheduleAction = {
    id: string;
    icon: string;
    label: string;
};
export const scheduleActions: ScheduleAction[] = [
    { id: 'remove', label: 'Supprimer', icon: 'fa fa-trash' },
    { id: 'add', label: 'Ajouter', icon: 'fa fa-plus' },
    { id: 'copy', label: 'Copier', icon: 'fa fa-copy' },
    { id: 'swap', label: 'Échanger', icon: 'fa fa-right-left' },
];

type DishScheduleContextI = {
    dishScheduleItems: DishScheduleItem[];
    reloadSchedule: (date: string) => void;
    date: string;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    action: ScheduleAction | null;
    setAction: React.Dispatch<React.SetStateAction<ScheduleAction | null>>;
    // selectedCell: SelectedCell | null;
    // setSelectedCell: React.Dispatch<React.SetStateAction<SelectedCell | null>>;
    // swapItem1: SwapItem | null;
    // setSwapItem1: React.Dispatch<React.SetStateAction<SwapItem | null>>;
    // swapItem2: SwapItem | null;
    // setSwapItem2: React.Dispatch<React.SetStateAction<SwapItem | null>>;
    //  swapMod: boolean;
    // setSwapMod: React.Dispatch<React.SetStateAction<boolean>>;
};
export const DishScheduleContext = createContext<DishScheduleContextI>({} as DishScheduleContextI);

export default function SchedulePage() {
    const LS_date = localStorage.getItem(LS_DATE) ? (localStorage.getItem(LS_DATE) as string) : dayjs().format('YYYY-MM-DD');
    const [date, setDate] = useState<string>(LS_date);
    const [action, setAction] = useState<ScheduleAction | null>(null);
    const [dishScheduleItems, setDishScheduleItems] = useState<DishScheduleItem[]>([]);

    const reloadSchedule = useCallback((date: string) => {
        const payload = {
            startDate: dayjs(date).startOf('week').format('YYYY-MM-DD'),
            endDate: dayjs(date).endOf('week').format('YYYY-MM-DD'),
        };

        DishScheduleAPI.getPeriod(payload).then((res) => {
            setDishScheduleItems(res);
        });
    }, []);

    useEffect(() => {
        reloadSchedule(date);
    }, [date]);

    const context: DishScheduleContextI = {
        dishScheduleItems,
        reloadSchedule,
        date,
        setDate,
        action,
        setAction,
    };

    return (
        <DishScheduleContext.Provider value={context}>
            <div>
                <ScheduleHeader />
                <ScheduleBody />
                <ScheduleActionBar />
            </div>
        </DishScheduleContext.Provider>
    );
}
