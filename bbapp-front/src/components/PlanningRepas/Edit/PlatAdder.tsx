import {CheckIcon} from "@heroicons/react/16/solid";
import {useState} from "react";
import {PlatAPI} from "../../../api/PlatAPI.tsx";

interface PlatAdderProps {
    handlePlatSave?: () => void
}

export default function PlatAdder({handlePlatSave}: PlatAdderProps) {
    const [platInput, setPlatInput] = useState<string>('')
    const [log, setLog] = useState<string>('')

    const handleInput = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setPlatInput(target.value);

        PlatAPI.getPlatsByName({nom: target.value})
            .then(res => {
                setLog(JSON.stringify(res));
            })
    }

    return (
        <div>
            <div className={'py-1 flex gap-5'}>
                <input type="text"
                       onInput={handleInput}
                       placeholder={'Saisissez votre plat'}
                       value={platInput}
                       className="input input-xs w-full input-bordered"/>

                <CheckIcon onClick={handlePlatSave} className={'size-6'}></CheckIcon>
            </div>

            <div>{log}</div>
        </div>
    )
}