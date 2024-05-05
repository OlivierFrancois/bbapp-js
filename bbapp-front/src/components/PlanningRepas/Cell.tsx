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
        console.log('poke');
        setSelectedCell({
            date: date,
            moment: moment,
            planningRepas: planningRepas,
        })
    }

    return <div onClick={handleClick} className={'flex flex-col'}>
        {planningRepas?.plats.map(plat => (
            <div className={'capitalize'}>{plat.nom}</div>
        ))}
    </div>
}