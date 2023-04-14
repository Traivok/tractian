import { NextFunction, Request, Response } from 'express';
import { ValidateError }                   from '@tsoa/runtime';

export function ValidationErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
    if (err instanceof ValidateError) {
        return res.status(400).json({
            message: 'Validation Failed',
            details: err?.fields,
        });
    }

    next(err);
}
