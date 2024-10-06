import {Outlet} from 'react-router-dom';
import './index.css'

export const Root = () => {
    // Si besoin de provider, ici
    return (
        <>
            <Outlet/>
        </>
    );
};
