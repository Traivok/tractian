import serverlessExpress from '@vendia/serverless-express';
import { server }        from './index';
import process           from 'process';
import mongoose          from 'mongoose';
import console           from 'console';

const connectionString = process.env.MONGO_CONNECTION_STR ?? 'mongodb://localhost:27017/my-db';

mongoose.connect(connectionString, { serverSelectionTimeoutMS: 2000 })
    .then(() => console.log('Connected to MongoDB'))
    .catch(console.error)

exports.handler = serverlessExpress({ app: server });
