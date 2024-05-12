import {useContext, useEffect} from "react";
import {AppContext} from "./Root.tsx";

export default function HomePage() {
    const {setNavbarForceOpening} = useContext(AppContext)
    useEffect(() => { setNavbarForceOpening(true) }, []);

    return (
        <div className={'min-h-screen flex items-center justify-center'}>
            <div className={'text-xl font-semibold animate-bounce'}>Home</div>
        </div>
    );
}
