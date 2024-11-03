import api from '../api.ts';
import { API_ENDPOINTS } from '../../routes.ts';
import { User } from '../../types/User.tsx';

export class HomeAPI {
    static async getProps(): Promise<User> {
        return api.get(API_ENDPOINTS.home.getProps).then((res) => res.data);
    }
}
