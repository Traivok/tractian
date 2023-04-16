import { Types }        from 'mongoose';
import { Identifiable } from './identifiable.dto';
import { AssetDto }     from './asset.dto';

export interface UnitDto extends Identifiable {
    companyId: Types.ObjectId;
    name: string;
    description?: string;
    location: string;
    // TODO assets
}

export interface UnitItemDto extends UnitDto {
    assetsCount: number;
}


export interface UnitDetailDto extends  UnitDto {
    assets: AssetDto
}

export interface CreateUnitDto {
    name: string;
    description?: string;
    location: string;
}

export type UpdateUnitDto = Partial<CreateUnitDto>;
