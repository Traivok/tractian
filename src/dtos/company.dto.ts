import { Identifiable } from './identifiable.dto';

export interface CompanyDto extends Identifiable {
    name: string;
    description?: string;
    industry?: string;
}

export type CreateCompanyDto = Omit<CompanyDto, 'users' | 'units' | '_id' | 'id'>;

export type UpdateCompanyDto = Partial<CreateCompanyDto>;
