import {useContext, useMemo} from "react";
import {DishScheduleContext} from "../dish-schedule.page.tsx";
import dayjs from "dayjs";

export default function DateSelect() {
    const {date, setDate} = useContext(DishScheduleContext);

    const handleDateChange = (ymd: string) => {
        setDate(ymd);
    }

    const isThisWeek = useMemo(() => {
        return dayjs(date).week() === dayjs().week();
    }, [date]);

    return (
        <div className={'bg-gradient-to-br from-primary to-primary/85 from-10% h-12 text-secondary-content flex justify-between items-center py-1 px-2 text-2xl shadow'}>
            <div onClick={() => handleDateChange(dayjs(date).add(-1, 'week').format('YYYY-MM-DD'))} className="btn btn-sm">
                <i className="fa fa-arrow-left"></i>
            </div>

            <div onClick={() => handleDateChange(dayjs().format('YYYY-MM-DD'))} className={`btn btn-sm`}>
                <i className={`fa fa-calendar ${isThisWeek && 'text-secondary'}`}></i> Cette semaine
            </div>

            <div onClick={() => handleDateChange(dayjs(date).add(1, 'week').format('YYYY-MM-DD'))} className="btn btn-sm">
                <i className="fa fa-arrow-right"></i>
            </div>
        </div>
    )
}