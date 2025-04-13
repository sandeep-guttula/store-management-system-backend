import { Request, Response, NextFunction } from 'express';
import * as storeService from '../services/store.service';

export const createStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const store = await storeService.createStore(req.body);
        res.status(201).json(store);
    } catch (err) {
        next(err);
    }
};

export const getAllStores = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const stores = await storeService.getAllStores();
        res.json(stores);
    } catch (err) {
        next(err);
    }
};

export const getStoreById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const store = await storeService.getStoreById(+req.params.id);
        res.json(store);
    } catch (err) {
        next(err);
    }
};

export const updateStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("Updating store with ID:", req.params.id);
    try {
        const store = await storeService.updateStore(+req.params.id, req.body, req.user!);
        res.json({ message: 'Store updated', store });
    } catch (err) {
        next(err);
    }
};

export const deleteStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await storeService.deleteStore(+req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
