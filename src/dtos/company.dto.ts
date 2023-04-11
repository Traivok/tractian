import { UserDto } from './user.dto';
import { UnitDto } from './unit.dto';

export type CompanyDto = {
    name: string;
    description?: string;
    industry?: string;
    users: UserDto[];
    units: UnitDto[];
}

export type CreateCompanyDto = Omit<CompanyDto, 'users' | 'units'>
b
