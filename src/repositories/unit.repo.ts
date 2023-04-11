import { MongooseClient as client } from '../mongodb.connection';
import { Schema }                   from 'mongoose';

const UnitSchema = new Schema({
    companyId:   {
        type:     Schema.Types.ObjectId,
        ref:      'Company',
        required: true,
    },
    name:        {
        type:     String,
        required: true,
    },
    description: {
        type: String,
    },
    location:    {
        type:     String,
        required: true,
    },
});

const Unit = client.model('Unit', UnitSchema);

export { Unit, UnitSchema };
export default Unit;
