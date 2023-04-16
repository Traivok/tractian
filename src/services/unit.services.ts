import { CrudService, OmitMongo }             from './crud.service';
import Unit                                   from '../repositories/unit.repo';
import { UnitDto, UnitItemDto }               from '../dtos/unit.dto';
import { Types }                              from 'mongoose';
import { InvalidateEmpty, ValidateObjectIds } from '../lib/validation.lib';

class UnitService extends CrudService<UnitDto> {
    constructor() {
        super(Unit);
    }

    public async findByCompanyId(companyId: Types.ObjectId): Promise<OmitMongo<UnitItemDto>[]> {
        ValidateObjectIds({ companyId });

        return this.model.aggregate()
            .lookup({ from: 'assets', localField: '_id', foreignField: 'unitId', as: 'assets' })
            .group({
                _id:         '$_id',
                name:        { $first: '$name' },
                description: { $first: '$description' },
                location:    { $first: '$location' },
                companyId:   { $first: '$companyId' },
                assetCount:  { $sum: { $size: '$assets' } },
            })
            .match({ companyId: new Types.ObjectId(companyId) });
    }

    public async findDetailed(companyId: Types.ObjectId, unitId: Types.ObjectId): Promise<OmitMongo<UnitDto>> {
        ValidateObjectIds({ companyId, unitId });

        const [ maybeUnit ] = await this.model.aggregate()
            .lookup({
                from:         'assets',
                foreignField: 'unitId',
                localField:   '_id',
                pipeline:     [
                    {
                        $lookup: {
                            from:         'users',
                            localField:   'ownerId',
                            foreignField: '_id',
                            as:           'owner',
                        },
                    },
                    {
                        $addFields: {
                            owner: { $arrayElemAt: [ '$owner', 0 ] },
                        },
                    },
                ],
                as:           'assets',
            })
            .match({
                _id:       new Types.ObjectId(unitId),
                companyId: new Types.ObjectId(companyId),
            })
            .limit(1);

        return InvalidateEmpty(maybeUnit);
    }

}

export default new UnitService();
