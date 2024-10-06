import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AppLayout from './layouts/app.layout.tsx';
import ArticlePage from './pages/_old/Article/article.page.tsx';
import DishSchedulePage from './pages/_old/DishSchedule/dish-schedule.page.tsx';
import DishPage from './pages/_old/Dish/dish.page.tsx';
import ErrorPage from './error.page.tsx';
import { Root } from './root.tsx';
import HomePage from './pages/home/home.page.tsx';
import SchedulePage from './pages/schedule/schedule.page.tsx';
import { APP_ROUTES } from './routes.ts';

export const routes = () => {
    return createRoutesFromElements(
        <Route element={<Root />} errorElement={<ErrorPage />}>
            <Route path={'old'} element={<AppLayout />}>
                <Route path={'dish-schedule'} element={<DishSchedulePage />} />
                <Route path={'dish'} element={<DishPage />} />
                <Route path={'article'} element={<ArticlePage />} />
            </Route>

            <Route path={''} element={<AppLayout />}>
                <Route path={APP_ROUTES.home} element={<HomePage />} />
                <Route path={APP_ROUTES.schedule.index} element={<SchedulePage />} />
            </Route>
        </Route>
    );
};

export default function AppRouter() {
    return createBrowserRouter(routes());
}
