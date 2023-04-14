import { RoleType } from '../repositories/user.repo';

export interface UserDto {
    name: string;
    email: string;
    companyId: string;
    role: RoleType;
}

export interface CreateUserDto {
    name: string;
    email: string;
    role?: RoleType;
}
