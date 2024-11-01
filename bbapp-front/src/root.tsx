import { Outlet } from 'react-router-dom';
import './index.css';
import { ModalProvider } from './contexts/modal.provider.tsx';
import { AuthProvider } from './pages/auth.context.tsx';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RootProps {
    initialAuthDatas?: any;
}

export const Root = ({ initialAuthDatas }: RootProps) => {
    return (
        <>
            <ModalProvider>
                <AuthProvider initialAuthDatas={initialAuthDatas}>
                    <Outlet />
                    <ToastContainer closeOnClick={true} position="bottom-right" theme="colored" transition={Bounce} autoClose={5000} />
                </AuthProvider>
            </ModalProvider>
        </>
    );
};
