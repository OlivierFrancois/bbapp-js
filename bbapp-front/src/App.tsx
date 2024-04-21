import Navbar from "./components/Navbar/Navbar.tsx";
import {useState} from "react";

function App() {

    const [isNavbarOpened, setIsNavbarOpened] = useState(true)


    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-primary to-primary/85 from-10%">
            <div className={'flex-1 bg-blue-100 overflow-scroll bg-white rounded-b-3xl'}>

                <div className="bg-green-200">
                    poke
                </div>
            </div>

            <Navbar isNavbarOpened={isNavbarOpened} />
        </div>
    )
}

export default App
