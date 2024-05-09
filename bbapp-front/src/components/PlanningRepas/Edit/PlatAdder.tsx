import React, {useState} from "react";
import {PlatAPI} from "../../../api/PlatAPI.tsx";
import Plat from "../../../interfaces/Plat.tsx";
import {XMarkIcon} from "@heroicons/react/16/solid";

interface PlatAdderProps {
    handlePlatSave: (plat: Plat|null) => void
}

export default function PlatAdder({handlePlatSave}: PlatAdderProps) {
    const [platInput, setPlatInput] = useState<string>('')
    const [plats, setPlats] = useState<Plat[]>([])

    const handleInput = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setPlatInput(target.value);
        if (target.value.length > 0) {
            PlatAPI.getPlatsByName({nom: target.value})
                .then(res => {
                    setPlats(res);
                })
        } else {
            setPlats([]);
        }
    }

    const handleCreatePlat = () => {
        const payload = {id: 0, nom: platInput}
        PlatAPI.save(payload)
            .then(plat => {
                handlePlatSave(plat);
            })
    }

    return (
        <div className={'py-1 flex items-center gap-5'}>
            <div className={'relative flex-1'}>
                <input type="text"
                       onInput={handleInput}
                       placeholder={'Recherchez un plat'}
                       value={platInput}
                       className="input input-sm w-full input-bordered "/>

                {plats.length > 0
                    ? <div className={'absolute top-100 w-full border border-t-0 rounded'}>{plats.map((p, k) => (
                        <div key={k} className={'capitalize text-sm py-3 px-2 border-t hover:bg-gray-50'} onClick={() => handlePlatSave(p)}>{ p.nom }</div>
                    ))}</div>
                    : platInput.length >= 3 && <div onClick={handleCreatePlat} className={'absolute top-100 w-full border border-t-0 rounded text-sm py-1 px-2 border-t hover:bg-gray-50 italic'}>Créer le plat "<span className={'capitalize font-medium'}>{platInput}</span>"</div>
                }
            </div>

            <XMarkIcon onClick={() => handlePlatSave(null)} className={'size-7'}></XMarkIcon>
        </div>
    )
}