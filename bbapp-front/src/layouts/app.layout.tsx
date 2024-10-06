import { useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Logo from '../components/logo.component.tsx';
import { APP_ROUTES } from '../routes.ts';

export default function AppLayout() {
    const articleContainer = useRef<HTMLDivElement>(null);

    const { pathname } = useLocation();

    //if (loading) return <AppLoader />;

    //REDIRECT
    //if (user?.role !== 'ADMIN') return <Navigate to="/" />;

    return (
        <main className="flex flex-col min-h-screen overflow-hidden max-h-screen">
            <nav className={'absolute w-screen p-4 top-0 flex items-center justify-between'}>
                <Link to={'/'} className={'btn btn-ghost btn-circle'}>
                    <Logo color={'#FBCE9E'} />
                </Link>

                <div className={'flex justify-end items-center gap-2'}>
                    <Link
                        to={APP_ROUTES.schedule.index}
                        className={`btn min-h-0 size-10 text-lg btn-circle ${pathname.includes(APP_ROUTES.schedule.index) ? 'btn-primary' : ''}`}
                    >
                        <i className="fa fa-calendar"></i>
                    </Link>

                    <Link
                        to={APP_ROUTES.shoppingList.index}
                        className={`btn min-h-0 size-10 text-lg btn-circle ${pathname.includes(APP_ROUTES.schedule.index) ? 'btn-primary' : ''}\`}>`}
                    >
                        <i className="fa fa-shopping-basket"></i>
                    </Link>
                </div>
            </nav>

            <article ref={articleContainer} className="container flex-1 flex flex-col overflow-y-auto">
                <Outlet />
            </article>
        </main>
    );
}
