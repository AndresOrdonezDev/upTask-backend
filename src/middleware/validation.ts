import { Request, Response, NextFunction } from 'express';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    if (
        Object.keys(req.body).length === 0 ||
        Object.values(req.body).some(value => typeof value === 'string' && value.trim() === '')
    ) {
        res.status(400).json({ msg: 'All fields are required' });
        return;
    }

    next();
};


