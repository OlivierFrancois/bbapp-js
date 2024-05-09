import Navbar from "../components/Navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";
import {useState} from "react";

export default function Root() {
    const [isNavbarOpened, setIsNavbarOpened] = useState<boolean>(true)

    return (
        <>
            <div className={`flex-1 overflow-y-auto bg-white ${isNavbarOpened ? 'rounded-b-3xl' : ''}`}>
                <Outlet />
            </div>

            <Navbar isNavbarOpened={true} setIsNavbarOpened={setIsNavbarOpened}/>
        </>
    );
}
