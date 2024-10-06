import { useContext, useMemo } from 'react';
import { DishScheduleContext } from '../schedule.page.tsx';
import dayjs from 'dayjs';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';

export default function ScheduleBody() {
    const { date } = useContext(DishScheduleContext);

    const dates = useMemo(() => {
        const datesMemo = [];

        let currentDate = dayjs(date).startOf('week');
        while (currentDate.isBefore(dayjs(date).endOf('week')) || currentDate.isSame(dayjs(date).endOf('week'))) {
            datesMemo.push(currentDate);
            currentDate = currentDate.add(1, 'day');
        }
        return datesMemo;
    }, [date]);

    return (
        <div className={'py-8 px-5 flex flex-col gap-2'}>
            {dates.map((date, dateKey) => (
                <>
                    <div className={'flex flex-col gap-2'} key={dateKey}>
                        <div className={'first-letter:uppercase font-medium text-md'}>{date.format('ddd D MMMM')}</div>

                        <div className={'flex flex-col gap-2'}>
                            <div className={'flex items-stretch text-noon gap-2 text-sm'}>
                                <div className={'flex gap-2 items-center'}>
                                    <SunIcon className={'size-4'} />
                                    <div className={'w-8'}>midi</div>
                                </div>

                                <div className={'bg-noon rounded-l w-1'}></div>
                            </div>

                            <div className={'flex items-stretch text-evening gap-2'}>
                                <div className={'flex gap-2 items-center text-sm'}>
                                    <MoonIcon className={'size-4'} />
                                    <div className={'w-8'}>soir</div>
                                </div>

                                <div className={'bg-evening rounded-l w-1'}></div>
                            </div>
                        </div>
                    </div>

                    <hr />
                </>
            ))}
        </div>
    );
}
