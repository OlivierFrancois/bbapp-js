import PlanningRepas from "../../interfaces/PlanningRepas.tsx";
import {useContext} from "react";
import {PlanningRepasContext} from "../../routes/PlanningRepasPage.tsx";

interface CellProps {
    date: string,
    moment: string,
    planningRepas?: PlanningRepas,
}

export default function Cell({date, moment, planningRepas}: CellProps) {
    const {setSelectedCell} = useContext(PlanningRepasContext);

    const handleClick = () => {
        setSelectedCell({
            date: date,
            moment: moment,
            planningRepas: planningRepas,
        })
    }

    return <div onClick={handleClick} className={'p-2 h-full flex items-start flex-wrap gap-1 hover:bg-gray-50 cursor-pointer'}>
        {planningRepas?.plats.map((plat) => (
            <div className={'bg-slate-200 hover:bg-slate-300 cursor-pointer px-2 text-center rounded-full first-letter:uppercase'}>{plat.nom}</div>
            ))
        }
    </div>
}