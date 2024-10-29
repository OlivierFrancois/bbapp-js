import ScheduleHeader from './components/header.component.tsx';
import { useCallback, useEffect, useState } from 'react';
import ScheduleBody from './components/body.component.tsx';
import ScheduleActionBar from './components/action.component.tsx';
import { DishScheduleItem } from '../../types/DishScheduleItem.tsx';
import { DishScheduleAPI } from '../../lib/api/DishScheduleAPI.tsx';
import dayjs from '../../lib/dayjs.ts';
import { LS_DATE } from '../../routes.ts';
import { AbstractItem, DishScheduleContext, DishScheduleContextI, ScheduleAction } from './schedule.utils.tsx';

export default function SchedulePage() {
    const LS_date = localStorage.getItem(LS_DATE) ? (localStorage.getItem(LS_DATE) as string) : dayjs().format('YYYY-MM-DD');
    const [date, setDate] = useState<string>(LS_date);
    const [action, setAction] = useState<ScheduleAction | null>(null);
    const [dishScheduleItems, setDishScheduleItems] = useState<DishScheduleItem[]>([]);
    const [swapItems, setSwapItems] = useState<{ to: AbstractItem | null; from: AbstractItem | null }>({ to: null, from: null });
    const [copyItems, setCopyItems] = useState<{ to: AbstractItem | null; from: AbstractItem | null }>({ to: null, from: null });

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
        swapItems,
        setSwapItems,
        copyItems,
        setCopyItems,
    };

    useEffect(() => {
        setSwapItems({ to: null, from: null });
    }, [action]);

    useEffect(() => {
        if (swapItems.from && swapItems.to) {
            const payloadTo = {
                date: swapItems.to.date,
                moment: swapItems.to.moment,
                dishIds: swapItems.from.dishScheduleItem?.dishes.map((dish) => dish.id) ?? [],
            };
            const payloadFrom = {
                date: new Date(swapItems.from.date).toISOString(),
                moment: swapItems.from.moment,
                dishIds: swapItems.to.dishScheduleItem?.dishes.map((dish) => dish.id) ?? [],
            };

            DishScheduleAPI.save(payloadTo).then(() => {
                DishScheduleAPI.save(payloadFrom).then(() => {
                    reloadSchedule(date);
                });
            });
            setSwapItems({ to: null, from: null });
        }
    }, [swapItems]);

    useEffect(() => {
        if (copyItems.from && copyItems.to) {
            const payloadTo = {
                date: copyItems.to.date,
                moment: copyItems.to.moment,
                dishIds: copyItems.from.dishScheduleItem?.dishes.map((dish) => dish.id) ?? [],
            };

            DishScheduleAPI.save(payloadTo).then(() => {
                reloadSchedule(date);
            });
            setCopyItems({ to: null, from: null });
        }
    }, [copyItems]);

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
