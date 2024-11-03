// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Home, User } from '../../types/User.tsx';
import { AuthHandler, Credentials, Session } from '../../lib/auth/auth.handler.ts';
import { APP_ROUTES, LS_TOKEN } from '../../routes.ts';

type AuthContextType = {
    user: User | null;
    session: Session | null;
    home: Home | null;
    loggedIn: boolean;
    login: (credentials: Credentials) => void;
    logout: () => void;
    loading: boolean;
    isAdmin: boolean;
};

type UserProviderProps = {
    children: React.ReactNode;
    initialAuthDatas?: {
        user: User | null;
        loaded: boolean;
    };
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ initialAuthDatas, children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(initialAuthDatas?.user || null);
    const [home, setHome] = useState<Home | null>(null);
    const loggedIn = useMemo(() => user !== null, [user]);
    const [loaded, setLoaded] = useState(initialAuthDatas === undefined ? false : initialAuthDatas.loaded);
    const [loading, setLoading] = useState(true);

    const [session, setSession] = useState<Session | null>(null);

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const check = async () => {
        const token = localStorage.getItem(LS_TOKEN);

        if (!token) {
            setLoaded(true);
            setLoading(false);
            if (pathname !== APP_ROUTES.auth.login && pathname !== APP_ROUTES.auth.signin && pathname !== APP_ROUTES.auth.passwordForgotten) {
                navigate(APP_ROUTES.auth.login);
            }
        }

        if (token) {
            return AuthHandler.getSession().then((session) => {
                if (!session) {
                    navigate(APP_ROUTES.auth.login);
                    return;
                } else {
                    setUser(session.user);
                    setLoaded(true);
                    setLoading(false);
                    setSession(session);
                    setHome(session.home);
                    if (!session.user && pathname !== APP_ROUTES.auth.login) {
                        navigate(APP_ROUTES.auth.login);
                    }
                    if (session.user && pathname === APP_ROUTES.auth.login) {
                        if (session.user.role === 'ADMIN') {
                            navigate(APP_ROUTES.admin.index);
                        } else {
                            navigate(APP_ROUTES.home);
                        }
                    }
                    return session.user;
                }
            });
        }
    };

    const logout = () => {
        setUser(null);
        setSession(null);
        localStorage.removeItem(LS_TOKEN);
        navigate(APP_ROUTES.auth.login);
    };

    const login = async (credentials: Credentials) => {
        return AuthHandler.storeToken(credentials).then((successfullyLoggedIn) => {
            if (successfullyLoggedIn) {
                check().then((user) => {
                    if (user?.role === 'ADMIN') {
                        navigate(APP_ROUTES.admin.index);
                    } else {
                        navigate(APP_ROUTES.home);
                    }
                });
            } else {
                toast.error('Identifiants incorrects.');
            }
        });
    };

    const onStorageChange = (e: StorageEvent) => {
        if (e.key === 'token' && e.newValue === null) {
            logout();
        }
    };

    useEffect(() => {
        if (!loaded) {
            check();
        }
        if (loaded && !user && pathname !== '/login') {
            navigate(APP_ROUTES.auth.login);
        }

        const token = localStorage.getItem(LS_TOKEN);
        if (token) {
            //axios.post("/_jwt", { token })
        }

        window.addEventListener('storage', onStorageChange);
        return () => {
            window.removeEventListener('storage', onStorageChange);
        };
    }, []);

    const isAdmin = useMemo(() => {
        return !!(session && session.user?.role === 'ADMIN');
    }, [session]);

    return (
        <AuthContext.Provider
            value={{
                user,
                home,
                loggedIn,
                login,
                logout,
                loading,
                session,
                isAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
