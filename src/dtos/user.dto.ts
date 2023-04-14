import { RoleType }     from '../repositories/user.repo';
import { Identifiable } from './identifiable.dto';
import { Types }        from 'mongoose';

export interface UserDto extends Identifiable {
    name: string;
    email: string;
    companyId: Types.ObjectId;
    role: RoleType;
}

// UserDto without companyId and optional role
export type CreateUserDto = {
    name: string;
    email: string;
    role?: RoleType;
}

export type UpdateUserDto = Partial<CreateUserDto>;
