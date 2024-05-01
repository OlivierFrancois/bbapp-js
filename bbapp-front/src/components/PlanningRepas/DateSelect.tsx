import {useContext} from "react";
import {PlanningRepasContext} from "../../routes/PlanningRepasPage.tsx";
import dayjs from "dayjs";

export default function DateSelect() {
    const {date, setDate} = useContext(PlanningRepasContext);

    const handleDateChange = (ymd: string) => {
        setDate(ymd);
    }

    return (
        <div className={'bg-secondary h-12 text-secondary-content flex justify-between items-center p-1 text-2xl shadow'}>
            <div onClick={() => handleDateChange(dayjs(date).add(-1, 'week').format('YYYY-MM-DD'))} className="btn btn-neutral btn-sm">
                <i className="fa fa-arrow-left"></i>
            </div>

            <div onClick={() => handleDateChange(dayjs().format('YYYY-MM-DD'))} className="btn btn-primary btn-sm">
                <i className="fa fa-calendar"></i> Cette semaine
            </div>

            <div onClick={() => handleDateChange(dayjs(date).add(1, 'week').format('YYYY-MM-DD'))} className="btn btn-neutral btn-sm">
                <i className="fa fa-arrow-right"></i>
            </div>
        </div>
    )
}