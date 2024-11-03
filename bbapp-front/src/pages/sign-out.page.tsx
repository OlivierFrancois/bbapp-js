import { useEffect } from 'react';
import { useAuth } from './auth.context.tsx';

export default function SignOutPage() {
    const { logout } = useAuth();

    useEffect(() => {
        logout();
    }, []);

    return null;
}
