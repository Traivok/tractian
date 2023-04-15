import { CrudService }       from './crud.service';
import { AssetDto }          from '../dtos/asset.dto';
import Asset, { StatusType } from '../repositories/asset.repo';

class AssetService extends CrudService<AssetDto> {
    constructor() {
        super(Asset);
    }

    /**
     * @param lowHealthThreshold selects all assets with health less than or equal to this arg
     */
    async findByLowHealth(lowHealthThreshold: number): Promise<AssetDto[]> {
        return this.findAll({ health: { $lte: lowHealthThreshold } });
    }

    async findByStatus(status: StatusType): Promise<AssetDto[]> {
        return this.findAll({ status });
    }
}

export default new AssetService();
