import React, { useContext, useMemo } from 'react';
import DateRow from './date-row.component.tsx';
import dayjs from '../../../lib/dayjs.ts';
import { DishScheduleContext } from '../schedule.utils.tsx';

export default function ScheduleBody() {
    const { date, dishScheduleItems } = useContext(DishScheduleContext);

    const dates = useMemo(() => {
        const datesMemo = [];

        let currentDate = dayjs(date).startOf('week');
        while (currentDate.isBefore(dayjs(date).endOf('week')) || currentDate.isSame(dayjs(date).endOf('week'))) {
            datesMemo.push(currentDate);
            currentDate = currentDate.add(1, 'day');
        }
        return datesMemo;
    }, [date]);

    const scheduleItemsByDate = useMemo(() => {
        return dates.map((date, dateKey) => {
            return {
                dateKey: dateKey,
                dishScheduleItems: dishScheduleItems.filter(
                    (scheduleItem) => dayjs(scheduleItem.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
                ),
            };
        });
    }, [dishScheduleItems]);

    return (
        <div className={'py-4 px-5 flex flex-col gap-3'}>
            {dates.map((date, dateKey) => (
                <React.Fragment key={dateKey}>
                    <DateRow date={date} scheduleItems={scheduleItemsByDate.find((temp) => temp.dateKey === dateKey)?.dishScheduleItems ?? []} />
                    <hr className={'border-t-2'} />
                </React.Fragment>
            ))}
        </div>
    );
}
