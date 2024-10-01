import {useContext} from "react";
import {DishScheduleContext} from "../dish-schedule.page.tsx";

export default function CacheComponent() {
    const {selectedCell, setSelectedCell} = useContext(DishScheduleContext);

    const handleClick = () => {
        setSelectedCell(null);
    }

    return <div onClick={handleClick}
                className={`transition-[background] absolute z-10 h-full w-full ${selectedCell ? 'bg-black/50' : ''}`}
                style={{
                    bottom: selectedCell ? 0 : '-100%',
                }}
        ></div>
}