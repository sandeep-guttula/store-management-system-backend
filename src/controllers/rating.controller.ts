import { Request, Response, NextFunction } from 'express';
import * as ratingService from '../services/rating.service';

export const createRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const rating = await ratingService.createRating(req.body, req.user!);
        res.status(201).json(rating);
    } catch (err) {
        next(err);
    }
};

export const updateRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const rating = await ratingService.updateRating(+req.params.id, req.body, req.user!);
        res.json({ message: 'Rating updated', rating });
    } catch (err) {
        next(err);
    }
};

export const getStoreRatings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const ratings = await ratingService.getStoreRatings(+req.params.storeId, req.user!);
        res.json(ratings);
    } catch (err) {
        next(err);
    }
};
