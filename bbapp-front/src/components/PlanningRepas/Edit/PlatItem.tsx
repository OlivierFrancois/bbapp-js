import Plat from "../../../interfaces/Plat.tsx";
import {TrashIcon} from "@heroicons/react/16/solid";

interface Props {
    plat: Plat
    handlePlatRemove: (plat: Plat) => void
}

export default function PlatItem({plat, handlePlatRemove}: Props) {

    return (
        <div className="flex items-center justify-between py-1">
            <div className={'capitalize'}>{plat.nom}</div>

            <div onClick={() => handlePlatRemove(plat)}>
                <TrashIcon className={'size-5'}/>
            </div>
        </div>
    )
}