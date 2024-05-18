import {useContext} from "react";
import {MealPlanContext} from "../../routes/MealPlanPage.tsx";
import dayjs from "dayjs";

export default function DateSelect() {
    const {date, setDate} = useContext(MealPlanContext);

    const handleDateChange = (ymd: string) => {
        setDate(ymd);
    }

    return (
        <div className={'bg-gradient-to-br from-primary to-primary/85 from-10% h-12 text-secondary-content flex justify-between items-center py-1 px-2 text-2xl shadow'}>
            <div onClick={() => handleDateChange(dayjs(date).add(-1, 'week').format('YYYY-MM-DD'))} className="btn btn-sm">
                <i className="fa fa-arrow-left"></i>
            </div>

            <div onClick={() => handleDateChange(dayjs().format('YYYY-MM-DD'))} className="btn btn-sm">
                <i className="fa fa-calendar"></i> Cette semaine
            </div>

            <div onClick={() => handleDateChange(dayjs(date).add(1, 'week').format('YYYY-MM-DD'))} className="btn btn-sm">
                <i className="fa fa-arrow-right"></i>
            </div>
        </div>
    )
}