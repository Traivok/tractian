import { StatusType }   from '../repositories/asset.repo';
import { Types }        from 'mongoose';
import { Identifiable } from './identifiable.dto';

export interface AssetDto extends Identifiable {
    name: string;
    description: string;
    serialCode: string;
    manufacturer: string;
    purchaseDate: Date;
    nextMaintenanceDate?: Date;
    needMaintenance: boolean; // derived from nextMaintenanceDate
    unitId: Types.ObjectId;
    ownerId: Types.ObjectId;
    model: string;
    status: StatusType;
    health: number;
    imageUrl: string;
}

export type CreateAssetDto = Omit<AssetDto, 'id' | 'unitId' | 'ownerId' | 'needMaintenance'>;

export type UpdateAssetDto = Partial<CreateAssetDto>;
