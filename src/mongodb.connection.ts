import mongoose from 'mongoose';

// TODO extract connection string from an env var / or a config service
const connectionString = 'mongodb://localhost:27017/my-db';

export const MongooseClient = mongoose.createConnection(
    connectionString,
    {
        autoIndex:  true,
        autoCreate: true,
    });
