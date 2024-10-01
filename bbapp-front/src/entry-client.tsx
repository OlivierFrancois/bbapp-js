import {createRoot, hydrateRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import AppRouter from "./app.router.tsx";

const container = document.getElementById('root');

if (import.meta.hot || !container?.innerText) {
    const root = createRoot(container!);
    root.render(<ClientApp />);
} else {
    hydrateRoot(container!, <ClientApp />);
}


function ClientApp() {
    return <RouterProvider router={AppRouter()} />;
}
