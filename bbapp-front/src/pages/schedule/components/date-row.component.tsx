import moments from '../../../types/Moment.tsx';
import { useEffect, useRef, useState } from 'react';
import { Dayjs } from 'dayjs';
import { DishScheduleItem } from '../../../types/DishScheduleItem.tsx';

interface DateRowProps {
    date: Dayjs;
    scheduleItems: DishScheduleItem[];
}

export default function DateRow({ date, scheduleItems }: DateRowProps) {
    const [isOpened, setIsOpened] = useState<boolean>(scheduleItems.length > 0);

    const containerRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState('0');

    useEffect(() => {
        if (isOpened && containerRef.current) {
            setMaxHeight(`${containerRef.current.scrollHeight}px`);
        } else {
            setMaxHeight('0');
        }
    }, [isOpened, moments]);

    return (
        <div className={'flex flex-col gap-0'}>
            <div className="flex items-center justify-between" onClick={() => setIsOpened(!isOpened)}>
                <div className={'first-letter:uppercase font-medium text-md'}>{date.format('ddd D MMMM')}</div>

                <i className={`text-dark fa ${isOpened ? 'fa-minus' : 'fa-plus'}`}></i>
            </div>

            <div ref={containerRef} className={`transition-all overflow-hidden`} style={{ maxHeight }}>
                <div className={'pt-4 flex flex-col gap-3 '}>
                    {moments.map((moment, momentKey) => {
                        const scheduleItem = scheduleItems.find((item) => item.moment === moment.id);

                        return (
                            <div key={momentKey} className={`flex items-stretch text-${moment.theme} gap-2 text-sm`}>
                                <div className={'flex gap-2 items-center'}>
                                    {moment.icon}
                                    <div className={'w-8'}>{moment.name}</div>
                                </div>

                                <div className={`bg-${moment.theme} rounded-l w-1`}></div>

                                <div className={'flex-1 flex flex-wrap items-center gap-2'}>
                                    {scheduleItem?.dishes.map((dish, dishKey) => (
                                        <div
                                            className={'bg-dark text-white px-2 py-1 rounded-full font-light text-sm first-letter:uppercase'}
                                            key={dishKey}
                                        >
                                            {dish.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
