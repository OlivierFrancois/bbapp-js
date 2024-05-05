import {CheckIcon} from "@heroicons/react/16/solid";
import {useState} from "react";

interface PlatAdderProps {
    handlePlatSave?: () => void
}

export default function PlatAdder({handlePlatSave}: PlatAdderProps) {
    const [platInput, setPlatInput] = useState<string>('')

    const handleInput = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setPlatInput(target.value);
    }

    return (
        <div className={'py-1 flex gap-5'}>
            <input type="text"
                   onInput={handleInput}
                   placeholder={'Saisissez votre plat'}
                   value={platInput}
                   className="input input-xs w-full input-bordered"/>

            <CheckIcon onClick={handlePlatSave} className={'size-6'}></CheckIcon>
        </div>
    )
}