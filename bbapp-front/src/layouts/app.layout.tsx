import {useRef} from 'react';
import {Outlet, useLocation} from 'react-router-dom';

export default function AppLayout() {
    const { pathname } = useLocation();

    const articleContainer = useRef<HTMLDivElement>(null);

    //if (loading) return <AppLoader />;

    //REDIRECT
    //if (user?.role !== 'ADMIN') return <Navigate to="/" />;

    return (
        <main className="flex min-h-screen overflow-hidden max-h-screen">
            {pathname}

            <article ref={articleContainer} className="container flex-1 px-8 py-4 overflow-y-auto">
                <div className="flex flex-col gap-6">

                    <Outlet />
                </div>
            </article>
        </main>
    );
}
