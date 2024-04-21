import Navbar from "../components/Navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";

export default function Root() {
    return (
        <>
            <div className={'flex-1 overflow-scroll bg-white rounded-b-3xl'}>
                <Outlet />
            </div>

            <Navbar isNavbarOpened={true}/>
        </>
    );
}
