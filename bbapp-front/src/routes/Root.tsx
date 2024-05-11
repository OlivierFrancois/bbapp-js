import Navbar from "../components/Navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";
import {useState} from "react";

export default function Root() {
    const [isNavbarOpened, setIsNavbarOpened] = useState<boolean>(false)

    return (
        <>
            <div className={`min-h-screen overflow-y-auto bg-white`}>
                <Outlet />
            </div>

            <Navbar isNavbarOpened={isNavbarOpened} setIsNavbarOpened={setIsNavbarOpened}/>
        </>
    );
}
