import { NextFunction, Request, Response } from 'express';

export function DuplicateKeyErrorHandler(err: any, req: Request, res: Response, next: NextFunction): Response | void {
    if (err.name === 'MongoServerError' && err.code === 11000) {
        return res.status(409).json({
            message: 'Duplicate key',
            details: err?.keyValue,
        });
    }

    next(err);
}
