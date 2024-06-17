import React from "react";
import Header from "./Header.tsx";
import {ReactNode} from "react";

const AREA_HEIGHT = '80%';

interface SlideUpModalProps {
    displayCondition: boolean,
    handleClose: () => void,
    headerContent: ReactNode,
    bodyContent: ReactNode,
}

export default function SlideUpModal({displayCondition, handleClose, headerContent, bodyContent}: SlideUpModalProps) {
    return (
        <React.Fragment>
            <div onClick={handleClose}
                 className={`transition-[background] absolute z-10 h-full w-full ${displayCondition ? 'bg-black/50' : ''}`}
                 style={{
                     bottom: displayCondition ? 0 : '-100%',
                 }}
            ></div>

            <div className={`z-20 transition-all absolute flex flex-col bg-white w-full border shadow`}
                 style={{
                     height: AREA_HEIGHT,
                     bottom: displayCondition ? 0 : `-${AREA_HEIGHT}`
                 }}>
                {displayCondition &&
                    <React.Fragment>
                        <Header handleClose={handleClose} headerContent={headerContent}/>

                        <hr/>

                        {bodyContent}
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    )
}