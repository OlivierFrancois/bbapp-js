import { Role, User } from '@prisma/client';

export type Session = {
    user: User;
    userType: Role | null;
};
