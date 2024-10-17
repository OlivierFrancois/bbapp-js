export const APP_ROUTES = {
    home: '/',
    schedule: {
        index: '/schedule',
    },
    shoppingList: {
        index: '/shopping-list',
    },
};

//const URL_GET = `${API_HOST}/dish-schedule/:id`;
const API_HOST = import.meta.env.VITE_API_ENDPOINT;

export const API_ENDPOINTS = {
    dishSchedule: {
        getPeriod: `${API_HOST}/dish-schedule/period`,
        save: `${API_HOST}/dish-schedule/save`,
        add: `${API_HOST}/dish-schedule/add`,
        remove: `${API_HOST}/dish-schedule/remove`,
    },
};

export const LS_DATE = 'BBAPP_DISH_SCHEDULE_DATE';
