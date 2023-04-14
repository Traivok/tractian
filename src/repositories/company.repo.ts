import { MongooseClient as client } from '../mongodb.connection';
import { Schema, Types }            from 'mongoose';
import User                         from './user.repo';
import Unit                         from './unit.repo';
import { CompanyDto }               from '../dtos/company.dto';

const CompanySchema = new Schema<CompanyDto>({
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
        type: Types.ObjectId,
        ref:  'User',
    } ],
    units:       [ {
        type: Types.ObjectId,
        ref:  'Unit',
    } ],
});

CompanySchema.post('findOneAndDelete', async function (doc) {
    if (doc !== null && '_id' in doc && Types.ObjectId.isValid(doc._id)) {
        await User.deleteMany({ companyId: doc._id }).exec();
        await Unit.deleteMany({ companyId: doc._id }).exec();
    }
});

const Company = client.model('Company', CompanySchema);

export { Company, CompanySchema };
export default Company;
