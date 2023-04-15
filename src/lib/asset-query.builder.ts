import { StatusType }         from '../repositories/asset.repo';
import { FilterQuery, Types } from 'mongoose';
import { ValidateObjectIds }  from './validation.lib';
import { AssetDto }           from '../dtos/asset.dto';

export interface AssetVirtualFilter extends FilterQuery<AssetDto> {
    healthLowerThan?: number;
    needMaintenance?: boolean;
    status?: StatusType;
    unitId?: Types.ObjectId;
}

interface AssetQuery extends FilterQuery<AssetDto> {
    health?: { $lte: number };
    nextMaintenanceDate?: { $lte: Date } | { $gt: Date };
    status?: StatusType;
    unitId?: Types.ObjectId;
}

export class AssetQueryBuilder {
    query: AssetQuery = {};

    // Inclusive
    healthLowerThan(value?: number): AssetQueryBuilder {
        if (value !== undefined) {
            this.query.health = { $lte: value };
        }

        return this;
    }

    needMaintenance(value?: boolean): AssetQueryBuilder {
        if (value === true) {
            this.query.nextMaintenanceDate = { $lte: new Date() };
        } else if (value === false) {
            this.query.nextMaintenanceDate = { $gt: new Date() };
        }

        return this;
    }

    status(value?: StatusType): AssetQueryBuilder {
        if (value !== undefined)
            this.query.status = value;

        return this;
    }

    unitId(value?: Types.ObjectId): AssetQueryBuilder {
        if (value !== undefined) {
            ValidateObjectIds({ value });
            this.query.unitId = value;
        }

        return this;
    }

    Build(): AssetQuery {
        return this.query;
    }
}

