import mongoose from 'mongoose';

const connectionString: string = 'mongodb://localhost:27017/my-db';

export const MongooseClient = mongoose.createConnection(connectionString,
    {
        autoIndex:  true,
        autoCreate: true,
    });
