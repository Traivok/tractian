import { StatusType } from '../repositories/asset.repo';

export interface AssetDto {
    name: string;
    description: string;
    serialCode: string;
    manufacturer: string;
    purchaseDate: Date;
    nextMaintenanceDate?: Date;
    needMaintenance: boolean; // derived from nextMaintenanceDate
    unitId: string;
    ownerId: string;
    model: string;
    status: StatusType;
    health: number;
    imageUrl: string;
}
