import prisma from '../config/database';
import { StoreInput, UpdateStore } from '../types/store.types';
import { User } from '@prisma/client';

export const createStore = async (data: StoreInput) => {
    return prisma.store.create({ data });
};

export const getAllStores = async () => {
    return prisma.store.findMany({
        select: {
            id: true,
            name: true,
            address: true,
            email: true,
            averageRating: true,
            owner: { select: { id: true, name: true } },
            ratings: {
                select: {
                    id: true,
                    rating: true,
                },
            }
        }
        // include: {
        //     ratings: true,
        // },
    });
};

export const getStoreById = async (id: number) => {
    const store = await prisma.store.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            address: true,
            email: true,
            averageRating: true,
            owner: { select: { id: true, name: true, email: true, address: true } },
        },
    });
    if (!store) throw new Error('Store not found');
    return store;
};

export const updateStore = async (id: number, data: UpdateStore, user: User) => {
    const store = await prisma.store.findUnique({ where: { id } });
    if (!store) throw new Error('Store not found');

    if (user.role !== 'ADMIN' && store.ownerId !== user.id) {
        throw new Error('Unauthorized to update this store');
    }

    return prisma.store.update({
        where: { id },
        data,
    });
};

export const deleteStore = async (id: number) => {
    return prisma.store.delete({ where: { id } });
};
