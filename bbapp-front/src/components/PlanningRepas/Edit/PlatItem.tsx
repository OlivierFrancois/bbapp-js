import Plat from "../../../interfaces/Plat.tsx";
import {TrashIcon} from "@heroicons/react/16/solid";

interface Props {
    plat?: Plat
}

export default function PlatItem({plat}: Props) {
    const handleRemove = () => {
        console.log('remove plat');
    }

    return (
        <div className="flex items-center justify-between py-1">
            <div className={'capitalize'}>{plat?.nom}</div>

            <div onClick={handleRemove}>
                <TrashIcon className={'size-5'}/>
            </div>
        </div>
    )
}