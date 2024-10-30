import moments from '../../../types/Moment.tsx';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Dayjs } from 'dayjs';
import { DishScheduleItem } from '../../../types/DishScheduleItem.tsx';
import MomentRow from './moment-row.component.tsx';
import dayjs from '../../../lib/dayjs.ts';
import { DishScheduleContext } from '../schedule.utils.tsx';

interface DateRowProps {
    date: Dayjs;
    scheduleItems: DishScheduleItem[];
}

export default function DateRow({ date, scheduleItems }: DateRowProps) {
    const { action } = useContext(DishScheduleContext);

    const defaultIsOpened = useMemo(() => {
        return (scheduleItems.length > 0 && date.isSameOrAfter(dayjs().startOf('d'))) || action !== null;
    }, [scheduleItems, date, action]);

    const [isOpened, setIsOpened] = useState<boolean>(defaultIsOpened);

    useEffect(() => {
        setIsOpened(defaultIsOpened);
    }, [scheduleItems, action]);

    const containerRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState('0');

    useEffect(() => {
        if (isOpened && containerRef.current) {
            setMaxHeight(`${containerRef.current.scrollHeight + 5}px`);
        } else {
            setMaxHeight('0');
        }
    }, [isOpened, moments, action]);

    return (
        <div className={'flex flex-col gap-0'}>
            <div className="flex items-center justify-between" onClick={() => setIsOpened(!isOpened)}>
                <div className={'first-letter:uppercase font-medium text-md'}>{date.format('ddd D MMMM')}</div>

                <i className={`transition-transform text-dark fa ${isOpened ? 'fa-minus' : 'fa-plus rotate-90'}`}></i>
            </div>

            <div ref={containerRef} className={`transition-all overflow-hidden`} style={{ maxHeight }}>
                <div className={'pt-3 flex flex-col gap-1 '}>
                    {moments.map((moment, momentKey) => (
                        <MomentRow
                            key={momentKey}
                            date={date}
                            moment={moment}
                            scheduleItem={scheduleItems.find((item) => item.moment === moment.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
