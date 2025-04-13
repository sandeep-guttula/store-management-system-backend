import { z } from 'zod';
import { ROLES } from '../config/constants';

export const signupSchema = z.object({
    name: z.string().min(3).max(60),
    email: z.string().email(),
    address: z.string().max(400),
    password: z.string().min(8).max(16).regex(/[A-Z]/).regex(/[^a-zA-Z0-9]/),
    role: z.enum([ROLES.ADMIN, ROLES.USER, ROLES.STORE_OWNER]),
});


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const storeSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    address: z.string().max(400),
    ownerId: z.number().optional(),
});

export const ratingSchema = z.object({
    rating: z.number().min(1).max(5),
    storeId: z.number(),
});