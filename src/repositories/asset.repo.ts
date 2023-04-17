import mongoose, { Schema } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import { AssetDto }         from '../dtos/asset.dto';

export const StatusValues = [ 'Running', 'Alerting', 'Stopped' ] as const;
export type StatusType = ( typeof StatusValues )[number]; // getsthe type union of the possible values above

const AssetSchema = new Schema<AssetDto>({
    name:                {
        type:     String,
        required: true,
    },
    description:         {
        type:     String,
        required: true,
    },
    serialCode:          {
        type:     String,
        required: true,
    },
    manufacturer:        {
        type:     String,
        required: true,
    },
    purchaseDate:        {
        type:     Date,
        required: true,
    },
    nextMaintenanceDate: {
        type: Date,
    },
    unitId:              {
        type:     Schema.Types.ObjectId,
        ref:      'Unit',
        required: true,
        index:    true,
    },
    ownerId:             {
        type:     Schema.Types.ObjectId,
        ref:      'User',
        required: true,
        index:    true,
    },
    model:               {
        type:     String,
        required: true,
    },
    status:              {
        type:     String,
        enum:     StatusValues,
        default:  'Stopped',
        required: true,
    },
    health:              {
        type:     Number,
        min:      0,
        max:      100,
        required: true,
    },
    imageUrl:            {
        type:     String,
        required: true,
    },
});

AssetSchema.virtual('needMaintenance')
    .get(function () {
        return ( this.nextMaintenanceDate !== undefined ) && ( this.nextMaintenanceDate.getTime() <= Date.now() );
    });

AssetSchema.plugin(mongooseLeanVirtuals);

const Asset = mongoose.connection.model('Asset', AssetSchema);
// moongose.Model<AssetSchema>

export { Asset, AssetSchema };
export default Asset;
