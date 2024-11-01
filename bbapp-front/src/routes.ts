import { API_HOST } from './lib/api.ts';

export const APP_ROUTES = {
    home: '/',
    login: '/login',
    logout: '/logout',
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
        login: `${API_HOST}/auth/login`,
        session: `${API_HOST}/auth/session`,
    },
    dishSchedule: {
        getPeriod: `${API_HOST}/dish-schedule/period`,
        save: `${API_HOST}/dish-schedule/save`,
        add: `${API_HOST}/dish-schedule/add`,
        remove: `${API_HOST}/dish-schedule/remove`,
    },
};

export const LS_TOKEN = 'BBAPP_TOKEN';
export const LS_DATE = 'BBAPP_DISH_SCHEDULE_DATE';
