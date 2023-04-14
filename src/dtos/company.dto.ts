import { Identifiable } from './identifiable.dto';
import { Types }        from 'mongoose';

export interface CompanyDto extends Identifiable {
    name: string;
    description?: string;
    industry?: string;
    users: Types.ObjectId[];
    units: Types.ObjectId[];
}

export type CreateCompanyDto = Omit<CompanyDto, 'users' | 'units' | '_id' | 'id'>;

export type UpdateCompanyDto = Partial<CreateCompanyDto>;
