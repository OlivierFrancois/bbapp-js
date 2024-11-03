import ScheduleHeader from './components/header.component.tsx';
import { useCallback, useEffect, useState } from 'react';
import ScheduleBody from './components/body.component.tsx';
import ScheduleActionBar from './components/action.component.tsx';
import { DishScheduleItem } from '../../types/DishScheduleItem.tsx';
import { DishScheduleAPI } from '../../lib/api/DishScheduleAPI.tsx';
import dayjs from '../../lib/dayjs.ts';
import { APP_ROUTES, LS_DATE } from '../../routes.ts';
import { AbstractItem, DishScheduleContext, DishScheduleContextI, LS_TYPE, ScheduleAction } from './schedule.utils.tsx';
import { useAuth } from '../auth/auth.context.tsx';
import { useNavigate } from 'react-router-dom';

export default function SchedulePage() {
    const { home } = useAuth();

    const navigate = useNavigate();

    if (!home) {
        navigate(APP_ROUTES.home);
    }

    const todayYmd = dayjs().format('YYYY-MM-DD');

    let LS_date_obj: LS_TYPE = { date: todayYmd, lastUpdate: dayjs().toISOString() };
    try {
        const LS_date = localStorage.getItem(LS_DATE);
        if (LS_date) {
            LS_date_obj = JSON.parse(LS_date);
        }
    } catch (error) {
        console.error('Erreur lors du parsing du JSON depuis le localStorage :', error);
    }

    const defaultDate = dayjs(LS_date_obj.lastUpdate).isBefore(dayjs().add(-10, 'minutes')) ? todayYmd : LS_date_obj.date;

    const [date, setDate] = useState<string>(defaultDate);
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
            <div className={'pb-14'}>
                <ScheduleHeader />
                <ScheduleBody />
                <ScheduleActionBar />
            </div>
        </DishScheduleContext.Provider>
    );
}
