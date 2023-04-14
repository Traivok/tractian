import { UserDto }      from './user.dto';
import { UnitDto }      from './unit.dto';
import { Identifiable } from './identifiable.dto';

export interface CompanyDto extends Identifiable {
    name: string;
    description?: string;
    industry?: string;
    // users: UserDto[];
    // units: UnitDto[];
}

export type CreateCompanyDto = Omit<CompanyDto, 'users' | 'units' | '_id'>
