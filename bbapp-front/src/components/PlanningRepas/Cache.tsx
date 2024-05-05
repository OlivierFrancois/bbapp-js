import {useContext} from "react";
import {PlanningRepasContext} from "../../routes/PlanningRepasPage.tsx";

export default function Cache() {
    const {selectedCell, setSelectedCell} = useContext(PlanningRepasContext);

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