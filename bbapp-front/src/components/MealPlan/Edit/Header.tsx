import {useContext} from "react";
import {MealPlanContext} from "../../../routes/MealPlanPage.tsx";
import {XMarkIcon} from "@heroicons/react/16/solid";
import dayjs from "dayjs";

export default function Header() {
    const {selectedCell, setSelectedCell} = useContext(MealPlanContext)

    const handleCloseClick = () => {
        setSelectedCell(null);
    }

    return (
        <div className={'h-12 p-2 bg-stone-50 flex justify-between items-center'}>
            <div className="flex flex-col">
                <div className={'capitalize'}>{dayjs(selectedCell?.date).format('dddd DD/MM/YYYY')} {selectedCell?.moment}</div>
            </div>

            <div>
                <XMarkIcon onClick={handleCloseClick} className={'size-6'}/>
            </div>
        </div>
    )
}