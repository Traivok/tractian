import { MongooseClient as client } from '../mongodb.connection';
import { Schema, Types }            from 'mongoose';
import { UnitDto }                  from '../dtos/unit.dto';
import User                         from './user.repo';
import Asset                        from './asset.repo';

const UnitSchema = new Schema<UnitDto>({
    companyId:   {
        type:     Schema.Types.ObjectId,
        ref:      'Company',
        required: true,
        index:    true,
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

UnitSchema.post('findOneAndDelete', async function (doc) {
    if (doc !== null && '_id' in doc && Types.ObjectId.isValid(doc._id)) {
        await Asset.deleteMany({ unitId: doc._id }).exec();
    }
});

export { Unit, UnitSchema };
export default Unit;
