import prisma from '../config/database';
import { Prisma, User } from '@prisma/client';
import { hashPassword } from '../utils/password';
import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
    return prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, address: true },
    });
};

export const getUserById = async (id: number) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error('User not found');
    return user;
};

export const updateUser = async (id: number, data: Partial<User>, authUser: User) => {
    if (authUser.role !== 'ADMIN' && authUser.id !== id) {
        throw new Error('Unauthorized to update this user');
    }

    return prisma.user.update({
        where: { id },
        data,
    });
};

export const deleteUser = async (id: number) => {
    return prisma.user.delete({ where: { id } });
};

export const changePassword = async (id: number, data: { password: string }) => {
    const hashedPassword = await hashPassword(data.password);
    return prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
    });
};

export const addNewUser = async (data: Prisma.UserCreateInput) => {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new Error('Email already in use');

    const hashedPassword = await hashPassword(data.password);
    return prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
        },
    });
}