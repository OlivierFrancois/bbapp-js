import { Outlet } from 'react-router-dom';
import './index.css';
import { ModalProvider } from './contexts/modal.provider.tsx';
import { AuthProvider } from './pages/auth/auth.context.tsx';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalUpProvider } from './contexts/modal-up.provider.tsx';

interface RootProps {
    initialAuthDatas?: any;
}

export const Root = ({ initialAuthDatas }: RootProps) => {
    return (
        <>
            <ModalProvider>
                <ModalUpProvider>
                    <AuthProvider initialAuthDatas={initialAuthDatas}>
                        <Outlet />
                        <ToastContainer
                            style={{ zIndex: 1000 }}
                            closeOnClick={true}
                            position="bottom-right"
                            theme="colored"
                            transition={Bounce}
                            autoClose={5000}
                        />
                    </AuthProvider>
                </ModalUpProvider>
            </ModalProvider>
        </>
    );
};
