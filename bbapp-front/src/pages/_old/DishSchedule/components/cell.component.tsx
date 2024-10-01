import {DishScheduleItem} from "../../../../types/DishScheduleItem.tsx";
import {useContext, useEffect, useState} from "react";
import {DishScheduleContext} from "../dish-schedule.page.tsx";

interface CellProps {
    date: string,
    moment: string,
    dishScheduleItem?: DishScheduleItem,
}

export default function Cell({date, moment, dishScheduleItem}: CellProps) {
    const {setSelectedCell, swapMod, swapItem1, setSwapItem1, swapItem2, setSwapItem2} = useContext(DishScheduleContext)
    const [isSwapping, setIsSwapping] = useState<boolean>(false)

    const handleClick = () => {
        if (swapMod) {
            setIsSwapping(true);
            const swapItem = {
                date: date,
                moment: moment,
                dishScheduleItem: dishScheduleItem,
            }

            if (!swapItem1) setSwapItem1(swapItem);
            else if (!swapItem2) setSwapItem2(swapItem);
        }
        else {
            setSelectedCell({date, moment, dishScheduleItem})
        }
    }

    useEffect(() => {
        if (!swapItem1 && !swapItem2) setIsSwapping(false);
    }, [swapItem1, swapItem2]);

    return <div onClick={handleClick} className={`p-2 h-full flex items-start flex-wrap gap-1 hover:bg-gray-50 cursor-pointer ${isSwapping ? 'outline outline-2 outline-green-500 animate-pulse' : ''}`}>
        {dishScheduleItem?.dishes.map((dish, key) => (
            <div key={key} className={'bg-slate-200 hover:bg-slate-300 cursor-pointer px-2 text-center rounded-full first-letter:uppercase text-nowrap overflow-hidden text-ellipsis'}>
                {dish.name}
            </div>
        ))}
    </div>
}