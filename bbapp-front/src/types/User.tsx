export type User = {
    id: number;
    username: string;
    email: string;
    role: Role;
};

export type UserWithAuthLogs = User & {
    authLogs: { at: Date }[];
};

export type Role = 'USER' | 'ADMIN';
