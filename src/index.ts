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
import mongooseLeanVirtuals           from 'mongoose-lean-virtuals';

////////////////////////////////////////////////////////////////////////////////////////////////////
// Config and Init
////////////////////////////////////////////////////////////////////////////////////////////////////
dotenv.config();

export const server = express();
const port          = process.env.PORT ?? 3000;


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
const connectionString = process.env.MONGO_CONNECTION_STR ?? 'mongodb://localhost:27017/my-db';
const connectionParams = process.env.NODE_ENV === 'dev' ? { autoIndex: true, autoCreate: true } : {};

mongoose.connect(connectionString, {
        serverSelectionTimeoutMS: 2000,
        keepAlive:                true,
        ...connectionParams,
    })
    .then(() => server.listen(port, () => console.log(`App listening on the port ${ port }`)))
    .catch(console.error);
