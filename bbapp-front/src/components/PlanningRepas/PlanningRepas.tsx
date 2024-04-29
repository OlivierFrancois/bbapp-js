import {useContext} from "react";
import {PlanningRepasContext} from "../../routes/PlanningRepasPage.tsx";

export default function PlanningRepas() {
    const {date} = useContext(PlanningRepasContext);

    return (
        <div className={'flex-1'}>Planing {date}</div>
    )
}