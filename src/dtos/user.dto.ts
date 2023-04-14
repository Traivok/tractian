import { RoleType } from '../repositories/user.repo';

export interface UserDto {
    name: string;
    email: string;
    companyId: string;
    role: RoleType;
}

// UserDto without companyId and optional role
export type CreateUserDto = {
    name: string;
    email: string;
    role?: RoleType;
}

export type UpdateUserDto = Partial<CreateUserDto>;
