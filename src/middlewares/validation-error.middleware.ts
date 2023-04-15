import { NextFunction, Request, Response } from 'express';
import { ValidateError }                   from '@tsoa/runtime';
import { Error }                           from 'mongoose';

function isMongoValidatioError(err: unknown): err is Error.ValidatorError & { errors: Record<string, Error.ValidatorError> } {
    return typeof err === 'object' && err !== null && 'name' in err && err.name === 'ValidationError';
}

export function ValidationErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
    // Mongoose Errors
    if (isMongoValidatioError(err)) {
        return res.status(400).json({
            message: 'Validation Failed',
            details: err.errors,
        });
    }

    // Tsoa Errros
    if (err instanceof ValidateError) {
        return res.status(400).json({
            message: 'Validation Failed',
            details: err?.fields,
        });
    }

    next(err);
}
