import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AppLayout from './layouts/app.layout.tsx';
import ErrorPage from './error.page.tsx';
import { Root } from './root.tsx';
import HomePage from './pages/home/home.page.tsx';
import SchedulePage from './pages/schedule/schedule.page.tsx';
import { APP_ROUTES } from './routes.ts';
import SignInPage from './pages/auth/sign-in.page.tsx';
import SignOutPage from './pages/auth/sign-out.page.tsx';
import SignUpPage from './pages/auth/sign-up.page.tsx';
import PasswordForgotten from './pages/auth/password-forgotten.page.tsx';
import UserPage from './pages/user/user.page.tsx';
import { HomeAPI } from './lib/api/home.api.tsx';

export const routes = (initialAuthDatas: any) => {
    return createRoutesFromElements(
        <Route element={<Root initialAuthDatas={initialAuthDatas} />} errorElement={<ErrorPage />}>
            <Route path={''} element={<AppLayout />}>
                <Route path={APP_ROUTES.user.edit} element={<UserPage />} />
                <Route path={APP_ROUTES.home} element={<HomePage />} loader={() => HomeAPI.getProps()} />
                <Route path={APP_ROUTES.schedule.index} element={<SchedulePage />} />
            </Route>

            <Route path={APP_ROUTES.auth.login} element={<SignInPage />} />
            <Route path={APP_ROUTES.auth.signin} element={<SignUpPage />} />
            <Route path={APP_ROUTES.auth.logout} element={<SignOutPage />} />
            <Route path={APP_ROUTES.auth.passwordForgotten} element={<PasswordForgotten />} />
        </Route>
    );
};

export default function AppRouter(initialAuthDatas: any) {
    return createBrowserRouter(routes(initialAuthDatas));
}
