import { API_HOST } from './lib/api.ts';

export const APP_ROUTES = {
    auth: {
        login: '/login',
        signin: '/signin',
        logout: '/logout',
        passwordForgotten: '/password-forgotten',
    },
    home: '/',
    user: {
        edit: `/your-account`,
    },
    admin: {
        index: '/admin',
    },
    schedule: {
        index: '/schedule',
    },
    shoppingList: {
        index: '/shopping-list',
    },
};

export const API_ENDPOINTS = {
    auth: {
        signIn: `${API_HOST}/auth/sign-in`,
        session: `${API_HOST}/auth/session`,
    },
    user: {
        signUp: `${API_HOST}/user/sign-up`,
        checkUsernameAvailability: `${API_HOST}/user/check-username-availability`,
        changePassword: `${API_HOST}/user/password`,
    },
    dishSchedule: {
        getPeriod: `${API_HOST}/dish-schedule/period`,
        save: `${API_HOST}/dish-schedule/save`,
        add: `${API_HOST}/dish-schedule/add`,
        remove: `${API_HOST}/dish-schedule/remove`,
    },
    home: {
        getProps: `${API_HOST}/home/props`,
    },
};

export const LS_TOKEN = 'BBAPP_TOKEN';
export const LS_DATE = 'BBAPP_DISH_SCHEDULE_DATE';
