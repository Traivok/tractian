import { Types }                  from 'mongoose';
import { CreateUserDto, UserDto } from '../dtos/user.dto';
import User                       from '../repositories/user.repo';

class UserService {
    async create(companyId: Types.ObjectId, dto: CreateUserDto): Promise<UserDto | null> {
        const user = new User({ companyId, ...dto });
        await user.save();
        return user.toJSON({ flattenMaps: false, virtuals: true });
    }

    async findAll(companyId?: Types.ObjectId): Promise<UserDto[]> {
        if (companyId !== undefined) {
            return User.find({ companyId }).lean();
        } else {
            return User.find().lean();
        }
    }

    async findOne(id: Types.ObjectId): Promise<UserDto | null> {
        const maybeUser = await User.findById(id);

        if (maybeUser === null) {
            return null;
        }

        return maybeUser.toJSON({ flattenMaps: false, virtuals: true });
    }
}

export default new UserService();
