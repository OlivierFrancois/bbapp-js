import api from '../api.ts';
import { API_ENDPOINTS } from '../../routes.ts';

export type SignUpPayload = {
    username: string;
    email: string;
    password: string;
};

export type UpdatePasswordPayload = {
    oldPassword: string;
    newPassword: string;
};

export class UserAPI {
    static async updatePassword(updatePasswordPayload: UpdatePasswordPayload): Promise<void> {
        return api.put(API_ENDPOINTS.user.changePassword, updatePasswordPayload).then((res) => res.data);
    }

    static async signUp(signUpPayload: SignUpPayload): Promise<void> {
        return api.post(API_ENDPOINTS.user.signUp, signUpPayload).then((res) => res.data);
    }

    static async checkUsernameAvailability(username: string): Promise<boolean> {
        return api.get(API_ENDPOINTS.user.checkUsernameAvailability, { params: { username } }).then((res) => res.data);
    }
}
