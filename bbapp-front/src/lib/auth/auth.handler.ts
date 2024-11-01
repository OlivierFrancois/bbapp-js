import api from '../api';
import { API_ENDPOINTS, LS_TOKEN } from '../../routes.ts';
import { User } from '../../types/User.tsx';

export type Credentials = {
    username: string;
    password: string;
    rememberMe?: boolean;
};
export type Session = {
    user: User;
};

export class AuthHandler {
    static async storeToken(credentials: Credentials) {
        return api
            .post(API_ENDPOINTS.auth.login, { ...credentials })
            .then((response) => {
                const { token } = response.data;
                localStorage.setItem(LS_TOKEN, token);
                return true;
            })
            .catch((_) => {
                return false;
            });
    }

    static async getSession(): Promise<Session> {
        return api
            .get(API_ENDPOINTS.auth.session)
            .then((response) => response.data)
            .catch((e) => {
                if (e.response.status === 401 || e.response.status === 498) {
                    return { user: null };
                } else {
                    throw e;
                }
            });
    }
}
