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

    return <div onClick={handleClick} className={'flex flex-col justify-center p-1 h-full first-letter:uppercase'}>
        {planningRepas?.plats.map((plat) => plat.nom).join(', ')}
    </div>
}