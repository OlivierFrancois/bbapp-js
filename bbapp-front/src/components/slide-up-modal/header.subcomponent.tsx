import {ReactNode} from "react";
import {XMarkIcon} from "@heroicons/react/16/solid";

interface HeaderProps {
    handleClose: () => void,
    headerContent: ReactNode,
}

export default function HeaderSubcomponent({handleClose, headerContent}: HeaderProps) {
    return (
        <div className={'h-12 p-2 bg-stone-50 flex justify-between items-center'}>
            <div className="flex flex-col">
                {headerContent}
            </div>

            <div>
                <XMarkIcon onClick={handleClose} className={'size-6'}/>
            </div>
        </div>
    )
}