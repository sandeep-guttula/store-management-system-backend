import prisma from '../config/database';
import { RatingInput } from '../types/rating.types';
import { User } from '@prisma/client';

const updateStoreAverageRating = async (storeId: number) => {
    const ratings = await prisma.rating.findMany({
        where: { storeId },
        select: { rating: true },
    });

    const average =
        ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1);

    await prisma.store.update({
        where: { id: storeId },
        data: { averageRating: parseFloat(average.toFixed(2)) },
    });
};

export const createRating = async (data: RatingInput, user: User) => {
    const existing = await prisma.rating.findUnique({
        where: {
            userId_storeId: {
                userId: user.id,
                storeId: data.storeId,
            },
        },
    });

    if (existing) throw new Error('You have already rated this store');

    const rating = await prisma.rating.create({
        data: {
            rating: data.rating,
            userId: user.id,
            storeId: data.storeId,
        },
    });

    await updateStoreAverageRating(data.storeId);

    return rating;
};

export const updateRating = async (id: number, data: RatingInput, user: User) => {
    const rating = await prisma.rating.findUnique({ where: { id } });

    if (!rating || rating.userId !== user.id) {
        throw new Error('Unauthorized or rating not found');
    }

    const updated = await prisma.rating.update({
        where: { id },
        data: { rating: data.rating },
    });

    await updateStoreAverageRating(updated.storeId);

    return updated;
};

export const getStoreRatings = async (storeId: number, user: User) => {
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) throw new Error('Store not found');

    if (user.role !== 'ADMIN' && store.ownerId !== user.id) {
        throw new Error('Unauthorized to view ratings for this store');
    }

    return prisma.rating.findMany({
        where: { storeId },
        include: {
            user: { select: { id: true, name: true, email: true } },
        },
    });
};