import { Outlet } from 'react-router-dom';
import './index.css';
import { ModalProvider } from './contexts/modal.provider.tsx';

export const Root = () => {
    // Si besoin de provider, ici
    return (
        <>
            <ModalProvider>
                <Outlet />
            </ModalProvider>
        </>
    );
};
