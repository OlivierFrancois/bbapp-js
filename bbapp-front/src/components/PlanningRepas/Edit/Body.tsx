import {useContext} from "react";
import {PlanningRepasContext} from "../../../routes/PlanningRepasPage.tsx";

export default function Body() {
    const {selectedCell} = useContext(PlanningRepasContext)
    return <div>{JSON.stringify(selectedCell)}</div>
}