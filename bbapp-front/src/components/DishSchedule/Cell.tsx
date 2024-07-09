import DishScheduleItem from "../../interfaces/DishScheduleItem.tsx";
import {useContext} from "react";
import {DishScheduleContext} from "../../routes/DishSchedulePage.tsx";

interface CellProps {
    date: string,
    moment: string,
    dishScheduleItem?: DishScheduleItem,
}

export default function Cell({date, moment, dishScheduleItem}: CellProps) {
    const {setSelectedCell} = useContext(DishScheduleContext);

    const handleClick = () => {
        setSelectedCell({date, moment, dishScheduleItem})
    }

    return <div onClick={handleClick} className={'p-2 h-full flex items-start flex-wrap gap-1 hover:bg-gray-50 cursor-pointer'}>
        {dishScheduleItem?.dishes.map((dish, key) => (
            <div key={key} className={'bg-slate-200 hover:bg-slate-300 cursor-pointer px-2 text-center rounded-full first-letter:uppercase text-nowrap overflow-hidden text-ellipsis'}>
                {dish.name}
            </div>
        ))}
    </div>
}