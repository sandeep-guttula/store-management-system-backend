import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error: any) {
            res.status(400).json({
                error: 'Validation failed',
                details: error.errors || error.message,
            });
        }
    };
};
