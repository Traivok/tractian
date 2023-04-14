import { Types }                                 from 'mongoose';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dtos/user.dto';
import User                                      from '../repositories/user.repo';
import { ValidateObjectIds }                     from '../lib/validation.lib';

class UserService {
    async create(companyId: Types.ObjectId, dto: CreateUserDto): Promise<UserDto | null> {
        const user = new User({ companyId, ...dto });
        await user.save();
        return user.toJSON({ flattenMaps: false, virtuals: true });
    }

    async findAll(companyId?: Types.ObjectId): Promise<UserDto[]> {
        const users = await ( companyId ?
                              User.find({ companyId }) :
                              User.find() );

        return users.map(user => user.toJSON({ flattenMaps: false, virtuals: true }));
    }

    async findOne(id: Types.ObjectId, companyId: Types.ObjectId): Promise<UserDto | undefined> {
        const maybeUser = await User.findOne({ _id: id, companyId });

        if (maybeUser) {
            return maybeUser.toJSON({ flattenMaps: false, virtuals: true });
        }
    }

    async update(id: Types.ObjectId, companyId: Types.ObjectId, dto: UpdateUserDto): Promise<UserDto | undefined> {
        ValidateObjectIds({ id, companyId });

        const maybeUser = await User.findOneAndUpdate({ _id: id, companyId }, dto, { new: true });

        if (maybeUser) {
            return maybeUser.toJSON({ flattenMaps: false, virtuals: true });
        }
    }

    async delete(id: Types.ObjectId, companyId: Types.ObjectId): Promise<UserDto | null> {
        return User.findOneAndDelete({ _id: id, companyId });
    }
}

export default new UserService();
