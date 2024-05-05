import React, {useContext, useState} from "react";
import {PlanningRepasContext} from "../../../routes/PlanningRepasPage.tsx";
import Plat from "../../../interfaces/Plat.tsx";
import {TrashIcon} from "@heroicons/react/16/solid";
import PlatItem from "./PlatItem.tsx";

export default function Body() {
    const {selectedCell} = useContext(PlanningRepasContext)
    const [plats, setPlats] = useState<Plat[]>(selectedCell?.planningRepas?.plats ?? [])

    return (
        <div className={'p-3'}>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <div className={'font-semibold'}>Plats du repas</div>

                    <button className="btn btn-primary btn-xs">Ajouter</button>
                </div>

                <div className={'flex flex-col divide-y'}>
                    {plats.map(plat => <PlatItem plat={plat}/>)}
                </div>
            </div>

            <hr/>
        </div>
    )
}