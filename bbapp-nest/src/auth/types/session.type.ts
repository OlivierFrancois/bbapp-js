import { Home, Role, User } from '@prisma/client';

export type Session = {
    user: User;
    home: Home;
    userType: Role | null;
};
