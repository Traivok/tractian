import { Identifiable } from './identifiable.dto';

export interface CompanyDto extends Identifiable {
    name: string;
    description?: string;
    industry?: string;
    // users: UserDto[];
    // units: UnitDto[];
}

export type CreateCompanyDto = Omit<CompanyDto, 'users' | 'units' | '_id'>;

export type UpdateCompanyDto = Partial<CreateCompanyDto>;
