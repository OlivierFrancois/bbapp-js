import Header from "./Header.tsx";
import Body from "./Body.tsx";
import {useContext} from "react";
import {PlanningRepasContext} from "../../../routes/PlanningRepasPage.tsx";
import React from "react";

const AREA_HEIGHT = '80%';

export default function Edit() {
    const {selectedCell} = useContext(PlanningRepasContext)

    return (
        <div className={`transition-all absolute flex flex-col bg-white w-full border shadow`}
             style={{
                 height: AREA_HEIGHT,
                 bottom: selectedCell ? 0 : `-${AREA_HEIGHT}`
             }}>
            {selectedCell &&
                <React.Fragment>
                    <Header/>

                    <hr/>

                    <Body/>
                </React.Fragment>
            }
        </div>
    )
}