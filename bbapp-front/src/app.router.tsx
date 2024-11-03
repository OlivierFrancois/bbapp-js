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
import SignInPage from './pages/auth/sign-in.page.tsx';
import SignOutPage from './pages/auth/sign-out.page.tsx';
import SignUpPage from './pages/auth/sign-up.page.tsx';
import PasswordForgotten from './pages/auth/password-forgotten.page.tsx';

export const routes = (initialAuthDatas: any) => {
    return createRoutesFromElements(
        <Route element={<Root initialAuthDatas={initialAuthDatas} />} errorElement={<ErrorPage />}>
            <Route path={'old'} element={<AppLayout />}>
                <Route path={'dish-schedule'} element={<DishSchedulePage />} />
                <Route path={'dish'} element={<DishPage />} />
                <Route path={'article'} element={<ArticlePage />} />
            </Route>

            <Route path={''} element={<AppLayout />}>
                <Route path={APP_ROUTES.home} element={<HomePage />} />
                <Route path={APP_ROUTES.schedule.index} element={<SchedulePage />} />
            </Route>

            <Route path={APP_ROUTES.login} element={<SignInPage />} />
            <Route path={APP_ROUTES.signin} element={<SignUpPage />} />
            <Route path={APP_ROUTES.logout} element={<SignOutPage />} />
            <Route path={APP_ROUTES.passwordForgotten} element={<PasswordForgotten />} />
        </Route>
    );
};

export default function AppRouter(initialAuthDatas: any) {
    return createBrowserRouter(routes(initialAuthDatas));
}
