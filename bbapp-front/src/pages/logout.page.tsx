import { useEffect } from 'react';
import { useAuth } from './auth.context.tsx';

export default function LogoutPage() {
    const { logout } = useAuth();

    useEffect(() => {
        logout();
    }, []);

    return null;
}
