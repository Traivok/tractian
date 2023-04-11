import { MongooseClient as client } from '../mongodb.connection';
import { Schema }                   from 'mongoose';

const CompanySchema = new Schema({
    name:        {
        type:     String,
        required: true,
    },
    description: {
        type: String,
    },
    industry:    {
        type: String,
    },
    users:       [ {
        type: Schema.Types.ObjectId,
        ref:  'User',
    } ],
    units:       [ {
        type: Schema.Types.ObjectId,
        ref:  'Unit',
    } ],
});

const Company = client.model('Company', CompanySchema);

export { Company, CompanySchema };
export default Company;
