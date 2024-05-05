import {useContext, useState} from "react";
import {PlanningRepasContext} from "../../../routes/PlanningRepasPage.tsx";
import Plat from "../../../interfaces/Plat.tsx";
import PlatItem from "./PlatItem.tsx";
import PlatAdder from "./PlatAdder.tsx";

export default function Body() {
    const {selectedCell} = useContext(PlanningRepasContext)
    const [plats] = useState<Plat[]>(selectedCell?.planningRepas?.plats ?? [])
    const [platAdder, setPlatAdder] = useState<boolean>(false);

    const handleAddPlatInput = () => {
        setPlatAdder(true);
    }

    const handlePlatSave = () => {
        setPlatAdder(false);
    };

    return (
        <div className={'p-3'}>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <div className={'font-semibold'}>Plats du repas</div>

                    {!platAdder &&
                        <button onClick={handleAddPlatInput} className="btn btn-primary btn-xs">Ajouter</button>
                    }
                </div>

                <div className={'flex flex-col divide-y'}>
                    {plats.map(plat => <PlatItem plat={plat}/>)}

                    {platAdder && <PlatAdder handlePlatSave={handlePlatSave}/>}
                </div>
            </div>
        </div>
    )
}