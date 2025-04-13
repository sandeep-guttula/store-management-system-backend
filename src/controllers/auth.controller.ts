import { Request, Response, NextFunction } from 'express';
import { createUser, loginUser } from '../services/auth.service';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        next(error);
    }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, token } = await loginUser(req.body);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        next(error);
    }
};