import { useRouteError } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import {useState} from "react";

export default function ErrorPage() {
    const [isNavbarOpened, setIsNavbarOpened] = useState<boolean>(false)

    const error: unknown = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="min-h-screen flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col justify-center items-center">
                <h1 className={'font-semibold text-[5rem]'}>
                    <i className="fa fa-robot animate-bounce"></i>
                </h1>
            </div>

            <div className={'flex flex-col items-center justify-center gap-3'}>
                <p className={'italic text-xl'}>
                    {(error as { statusText?: string })?.statusText || (error as Error)?.message}
                </p>

                <a className={'btn btn-sm'} href="/">Retour à l'accueil</a>
            </div>


            <Navbar isNavbarOpened={isNavbarOpened} setIsNavbarOpened={setIsNavbarOpened}/>
        </div>
    );
}