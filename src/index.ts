import express, { NextFunction, Request, Response } from 'express';
import morgan                                       from 'morgan';
import swaggerUi                                    from 'swagger-ui-express';
import { RegisterRoutes }                           from './routes';
import dotenv                                       from 'dotenv';
import * as process                                 from 'process';
import mongoose                                     from 'mongoose';
import { ValidateError }                            from '@tsoa/runtime';
import { ValidationErrorHandler }                   from './middlewares/validation-error.middleware';
import { NotFoundErrorHandler }                     from './middlewares/not-found.middleware';
import { UnknownErrorHandler }                      from './middlewares/unknown-error.middleware';

////////////////////////////////////////////////////////////////////////////////////////////////////
// Config and Init
////////////////////////////////////////////////////////////////////////////////////////////////////
dotenv.config();

const server = express();
const port   = process.env.PORT ?? 3000;

const mongooseConnection = mongoose.createConnection('mongodb://localhost:27017/tractian');

////////////////////////////////////////////////////////////////////////////////////////////////////
// Middlewares
////////////////////////////////////////////////////////////////////////////////////////////////////
server.use(express.json());

server.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUi.generateHTML(await import('./swagger.json')),
    );
});

server.use(morgan('dev'));


////////////////////////////////////////////////////////////////////////////////////////////////////
// Routing
////////////////////////////////////////////////////////////////////////////////////////////////////
RegisterRoutes(server);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Validate Requests and Responses
////////////////////////////////////////////////////////////////////////////////////////////////////
server.use(ValidationErrorHandler);
server.use(NotFoundErrorHandler);
server.use(UnknownErrorHandler);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Starting server
////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
    console.log(`App listening on the port ${ port }`);
});
