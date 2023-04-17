import mongoose     from 'mongoose';
import * as process from 'process';

// TODO extract connection string from an env var / or a config service
const connectionString = process.env.MONGO_CONNECTION_STR ?? 'mongodb://localhost:27017/my-db';

export const MongooseClient = mongoose.createConnection(
    connectionString,
    {
        autoIndex:  true,
        autoCreate: true,
    });
