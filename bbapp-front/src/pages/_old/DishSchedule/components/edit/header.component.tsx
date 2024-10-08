import {useContext} from "react";
import {DishScheduleContext} from "../../dish-schedule.page.tsx";
import dayjs from "dayjs";

export default function Header() {
    const {selectedCell} = useContext(DishScheduleContext)

    return (
        <div className={'capitalize'}>
            {dayjs(selectedCell?.date).format('dddd DD/MM/YYYY')} {selectedCell?.moment}
        </div>
    )
}