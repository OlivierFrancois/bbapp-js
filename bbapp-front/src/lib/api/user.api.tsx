import api from '../api.ts';
import { API_ENDPOINTS } from '../../routes.ts';

export type UpdatePasswordPayload = {
    oldPassword: string;
    newPassword: string;
};

export class UserAPI {
    static async updatePassword(updatePasswordPayload: UpdatePasswordPayload): Promise<void> {
        return api.put(API_ENDPOINTS.user.changePassword, updatePasswordPayload).then((res) => res.data);
    }
}
