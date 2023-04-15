import { CrudService, OmitMongo }                from './crud.service';
import { AssetDto }                              from '../dtos/asset.dto';
import Asset                                     from '../repositories/asset.repo';
import { AssetQueryBuilder, AssetVirtualFilter } from '../lib/asset-query.builder';


class AssetService extends CrudService<AssetDto> {
    constructor() {
        super(Asset);
    }

    public async findBy(query: AssetVirtualFilter): Promise<OmitMongo<AssetDto>[]> {
        const filter = new AssetQueryBuilder()
            .healthLowerThan(query.healthLowerThan)
            .needMaintenance(query.needMaintenance)
            .status(query.status)
            .unitId(query.unitId)
            .Build();

        return this.findAll(filter);
    }


}

export default new AssetService();
