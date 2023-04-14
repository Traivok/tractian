import { NextFunction, Request, Response } from 'express';

export class NotFoundError {
    message: string;
    value?: any;
    status = 404 as const;

    constructor(message: string, value?: any) {
        this.message = message;
        if (value !== undefined) this.value = value;
    }
}

export function NotFoundErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
    if (err instanceof NotFoundError) {
        return res.status(err.status).json({
            message: err.message,
            details: err?.value,
        });
    }

    next(err);
}
