import { Request, Response, NextFunction } from 'express';

export const authorize =
    (...roles: string[]) =>
        (req: Request, res: Response, next: NextFunction): void => {
            console.log("User Authorization Middleware");
            if (!req.user || !roles.includes(req.user.role)) {
                res.status(403).json({ error: 'Access denied' });
                return;
            }
            console.log("User authorized with role:", req.user.role);
            next();
        };
