import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';
import prisma from '../config/database';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("Authenticating user...");
    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as { id: number };

        const user = await prisma.user.findUnique({ where: { id: payload.id } });
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }
        req.user = user;
        console.log("User authenticated:");
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};
