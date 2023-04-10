import { MongooseClient as client } from '../mongodb.connection';
import mongoose                     from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: 'string', required: true },
});

const User = client.model('User', userSchema);

export { User };
