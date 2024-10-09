import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DishScheduleContext } from '../schedule.page.tsx';
import dayjs from 'dayjs';
import DateRow from './date-row.component.tsx';
import { DishScheduleItem } from '../../../types/DishScheduleItem.tsx';
import { DishScheduleAPI } from '../../../api/DishScheduleAPI.tsx';

export default function ScheduleBody() {
    const [dishScheduleItems, setDishScheduleItems] = useState<DishScheduleItem[]>([]);

    const { date } = useContext(DishScheduleContext);

    useEffect(() => {
        const payload = {
            startDate: dayjs(date).startOf('week').format('YYYY-MM-DD'),
            endDate: dayjs(date).endOf('week').format('YYYY-MM-DD'),
        };

        DishScheduleAPI.getPeriod(payload).then((res) => {
            setDishScheduleItems(res);
        });
    }, [date]);

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
        <div className={'py-8 px-5 flex flex-col gap-3'}>
            {dates.map((date, dateKey) => (
                <React.Fragment key={dateKey}>
                    <DateRow date={date} scheduleItems={scheduleItemsByDate.find((temp) => temp.dateKey === dateKey)?.dishScheduleItems ?? []} />
                    <hr className={'border-t-2'} />
                </React.Fragment>
            ))}
        </div>
    );
}
