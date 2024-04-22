import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="flex-1 flex flex-col justify-center items-center gap-5 text-white">
            <div className="flex flex-col justify-center items-center">
                <h1 className={'font-semibold text-[5rem]'}>
                    <i className="fa fa-robot animate-bounce"></i>
                </h1>
            </div>

            <div className={'flex flex-col items-center justify-center'}>
                <p className={'italic text-xl'}>
                    {error.statusText || error.message}
                </p>
            </div>
        </div>
    );
}