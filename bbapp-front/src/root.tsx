import { Outlet } from 'react-router-dom';
import './index.css';
import { ModalProvider } from './contexts/modal.provider.tsx';
import { AuthProvider } from './pages/auth.context.tsx';
import { Slide, ToastContainer } from 'react-toastify';

interface RootProps {
    initialAuthDatas?: any;
}

export const Root = ({ initialAuthDatas }: RootProps) => {
    // Si besoin de provider, ici
    return (
        <>
            <ModalProvider>
                <AuthProvider initialAuthDatas={initialAuthDatas}>
                    <Outlet />
                    <ToastContainer closeOnClick={false} position="bottom-right" theme="colored" transition={Slide} autoClose={5000} />
                </AuthProvider>
            </ModalProvider>
        </>
    );
};
