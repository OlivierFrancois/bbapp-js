import PlanningRepas from "../../interfaces/PlanningRepas.tsx";

interface CellProps {
    date: string,
    moment: string,
    planningRepas?: PlanningRepas,
}

export default function Cell({date, moment, planningRepas}: CellProps) {
    return <div className={'flex flex-col'}>
        {planningRepas?.plats.map(plat => (
            <div className={'capitalize'}>{plat.nom}</div>
        ))}
    </div>
}