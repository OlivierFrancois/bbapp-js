import { useContext, useMemo } from 'react';
import dayjs from 'dayjs';
import { DishScheduleContext } from '../schedule.page.tsx';

export default function ScheduleHeader() {
    const { date, setDate } = useContext(DishScheduleContext);

    const handleDateChange = (ymd: string) => {
        setDate(ymd);
    };

    const formattedDate = useMemo(() => {
        const dateObj = dayjs(date);
        const monday = dateObj.startOf('week').add(1, 'day');
        const sunday = dateObj.endOf('week');

        return `${monday.format('D MMMM')} - ${sunday.format('D MMMM YYYY')}`;
    }, [date]);

    return (
        <div className={'h-[13rem] bg-center flex flex-col justify-end'} style={{ backgroundImage: `url('/public/background_blue.png')` }}>
            <div className={'text-white px-5 py-3 flex flex-col'}>
                <h3 className={''}>{formattedDate}</h3>

                <div className={'flex items-center justify-between'}>
                    <h2 className={'font-semibold text-2xl hover:underline cursor-pointer'} onClick={() => setDate(dayjs().format('YYYY-MM-DD'))}>
                        Repas de la semaine
                    </h2>

                    <div className={'flex items-center'}>
                        <button
                            onClick={() => handleDateChange(dayjs(date).add(-1, 'week').format('YYYY-MM-DD'))}
                            className="btn btn-square btn-xs btn-ghost text-xl"
                        >
                            <i className="fa fa-caret-left"></i>
                        </button>

                        <button
                            onClick={() => handleDateChange(dayjs(date).add(1, 'week').format('YYYY-MM-DD'))}
                            className="btn btn-square btn-xs btn-ghost text-xl"
                        >
                            <i className="fa fa-caret-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
