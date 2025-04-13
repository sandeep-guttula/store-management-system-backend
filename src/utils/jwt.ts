import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants';

export const generateToken = (user: User) => {
    return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};
