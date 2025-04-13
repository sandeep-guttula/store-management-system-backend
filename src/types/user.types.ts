import { Role } from '@prisma/client';

export interface SignupInput {
    name: string;
    email: string;
    address?: string;
    password: string;
    role: Role;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface UpdateUserInput {
    name?: string;
    address?: string;
    role?: Role;
    password?: string;
    email?: string;
}
