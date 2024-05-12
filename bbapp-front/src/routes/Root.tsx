import Navbar from "../components/Navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";
import React, {createContext, useState} from "react";

interface AppContextI {
    isNavbarOpened: boolean,
    setIsNavbarOpened: React.Dispatch<React.SetStateAction<boolean>>,
    navbarForceOpening: boolean,
    setNavbarForceOpening: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AppContext = createContext<AppContextI>({} as AppContextI);

export default function Root() {
    const [isNavbarOpened, setIsNavbarOpened] = useState<boolean>(false)
    const [navbarForceOpening, setNavbarForceOpening] = useState<boolean>(false)
    const context = {isNavbarOpened, setIsNavbarOpened, navbarForceOpening, setNavbarForceOpening}

    return (
        <AppContext.Provider value={context}>
            <div className={`min-h-screen overflow-y-auto bg-white`}>
                <Outlet />
            </div>

            <Navbar />
        </AppContext.Provider>
    );
}
