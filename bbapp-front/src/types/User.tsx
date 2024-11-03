export type User = {
    id: number;
    username: string;
    email: string;
    role: Role;
    homeId: number | null;
};

export type Home = {
    id: number;
    name: string;
};

export type UserWithAuthLogs = User & {
    authLogs: { at: Date }[];
};

export type Role = 'USER' | 'ADMIN' | 'HOME_LEADER';
