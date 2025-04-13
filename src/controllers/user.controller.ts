import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    res.json({ user: req.user });
};

export const listUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await userService.getUserById(+req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is required' });
            return;
        }
        const updated = await userService.updateUser(+req.params.id, req.body, req.user);
        res.json({ message: 'User updated', user: updated });
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userService.deleteUser(+req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is required' });
            return;
        }
        await userService.changePassword(req.user.id, req.body);
        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        next(err);
    }
}

export const addNewUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newUser = await userService.addNewUser(req.body);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        next(err);
    }
}