import express, { Request, Response } from 'express';
import morgan                         from 'morgan';
import swaggerUi                      from 'swagger-ui-express';
import { RegisterRoutes }             from './routes';
import dotenv                         from 'dotenv';
import * as process                   from 'process';
import { ValidationErrorHandler }     from './middlewares/validation-error.middleware';
import { NotFoundErrorHandler }       from './middlewares/not-found.middleware';
import { UnknownErrorHandler }        from './middlewares/unknown-error.middleware';
import { DuplicateKeyErrorHandler }   from './middlewares/duplicate-key.middleware';
import mongoose                       from 'mongoose';
import * as console                   from 'console';

////////////////////////////////////////////////////////////////////////////////////////////////////
// Config and Init
////////////////////////////////////////////////////////////////////////////////////////////////////
dotenv.config();

export const server = express();
const port          = process.env.PORT ?? 3000;

if (process.env.NODE_ENV === 'dev') {
    const connectionString = process.env.MONGO_CONNECTION_STR ?? 'mongodb://localhost:27017/my-db';
    console.log('Connecting to:', connectionString);
    mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 2000,
            autoIndex:                true,
            autoCreate:               true,
        })
        .then(() => console.log('Connected to MongoDB'))
        .catch(console.error);
}

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
server.use(DuplicateKeyErrorHandler);
server.use(UnknownErrorHandler);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Starting server
////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
    console.log(`App listening on the port ${ port }`);
});
