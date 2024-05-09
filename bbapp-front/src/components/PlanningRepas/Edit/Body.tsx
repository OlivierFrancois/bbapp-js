import {useContext, useEffect, useRef, useState} from "react";
import {PlanningRepasContext} from "../../../routes/PlanningRepasPage.tsx";
import Plat from "../../../interfaces/Plat.tsx";
import PlatItem from "./PlatItem.tsx";
import PlatAdder from "./PlatAdder.tsx";
import {PlanningRepasAPI} from "../../../api/PlanningRepasAPI.tsx";

export default function Body() {
    const {selectedCell} = useContext(PlanningRepasContext)

    const [plats, setPlats] = useState<Plat[]>(selectedCell?.planningRepas?.plats ?? [])
    const [platAdder, setPlatAdder] = useState<boolean>(false);
    const hasBeenRendered = useRef(false);

    // TODO : ask benjamin
    useEffect(() => {
        if (hasBeenRendered.current) {
            save()
        }
        hasBeenRendered.current = true;
    }, [plats]);

    if (!selectedCell) return <div></div>;

    const handleAddPlatInput = () => {
        setPlatAdder(true);
    }
    const handlePlatSave = (plat: Plat|null) => {
        setPlatAdder(false);
        if (plat) {
            setPlats([...plats, plat]);
        }
    };
    const handlePlatRemove = (plat: Plat) => {
        setPlats(plats.filter(p => p.id !== plat.id));
    };

    const save = () => {
        const platIds = plats.map(p => p.id)
        const payload = {
            platIds: platIds,
            date: selectedCell.date,
            moment: selectedCell.moment
        }
        PlanningRepasAPI.save(payload)
            .then(r => {
                console.log(r)
            });
    }

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
                    {plats.map((plat, k) => <PlatItem key={k} handlePlatRemove={handlePlatRemove} plat={plat}/>)}

                    {platAdder && <PlatAdder handlePlatSave={handlePlatSave}/>}
                </div>
            </div>
        </div>
    )
}