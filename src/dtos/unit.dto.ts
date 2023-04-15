import { Types }        from 'mongoose';
import { Identifiable } from './identifiable.dto';

export interface UnitDto extends Identifiable {
    companyId: Types.ObjectId;
    name: string;
    description?: string;
    location: string;
    // TODO assets
}

export interface CreateUnitDto {
    name: string;
    description?: string;
    location: string;
}

export type UpdateUnitDto = Partial<CreateUnitDto>;
