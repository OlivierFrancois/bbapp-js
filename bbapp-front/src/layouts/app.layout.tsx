import { useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Logo from '../components/logo.component.tsx';
import { APP_ROUTES } from '../routes.ts';
import { useAuth } from '../pages/auth/auth.context.tsx';

export default function AppLayout() {
    const articleContainer = useRef<HTMLDivElement>(null);

    const { pathname } = useLocation();
    const { home } = useAuth();

    //if (loading) return <AppLoader />;

    //REDIRECT
    //if (user?.role !== 'ADMIN') return <Navigate to="/" />;

    return (
        <main className="flex flex-col min-h-screen overflow-hidden max-h-screen w-full">
            <nav className={'z-10 rounded-full absolute w-full p-4 top-1 flex items-center justify-between'}>
                <Link to={'/'} className={'btn btn-ghost btn-circle'}>
                    <Logo color={pathname === APP_ROUTES.home ? '#FBCE9E' : '#7ACFB0'} />
                </Link>

                {home && (
                    <div className={'flex justify-end items-center gap-2'}>
                        <Link
                            to={APP_ROUTES.dish.index}
                            className={`shadow btn min-h-0 size-10 text-lg btn-circle ${pathname.includes(APP_ROUTES.dish.index) ? 'btn-primary' : ''}`}
                        >
                            <i className="fa fa-utensils"></i>
                        </Link>

                        <Link
                            to={APP_ROUTES.schedule.index}
                            className={`shadow btn min-h-0 size-10 text-lg btn-circle ${pathname.includes(APP_ROUTES.schedule.index) ? 'btn-primary' : ''}`}
                        >
                            <i className="fa fa-calendar"></i>
                        </Link>

                        <Link
                            to={APP_ROUTES.shoppingList.index}
                            className={`shadow btn min-h-0 size-10 text-lg btn-circle ${pathname.includes(APP_ROUTES.shoppingList.index) ? 'btn-primary' : ''}`}
                        >
                            <i className="fa fa-shopping-basket"></i>
                        </Link>
                    </div>
                )}
            </nav>

            <article ref={articleContainer} className=" flex-1 flex flex-col overflow-y-auto">
                <Outlet />
            </article>
        </main>
    );
}
