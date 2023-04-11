import { RoleType } from '../repositories/user.repo';

export interface UserDto {
    name: string;
    email: string;
    companyId: number;
    role: RoleType;
}
