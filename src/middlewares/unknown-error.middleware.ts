import { NextFunction, Request, Response } from 'express';

export function UnknownErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
    if (err instanceof Error) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

    next();
}
