import { MongooseClient as client } from '../mongodb.connection';
import { Schema }                   from 'mongoose';
import { UserDto }                  from '../dtos/user.dto';

export const RoleValues = [ 'admin', 'technician' ] as const;
export type RoleType = ( typeof RoleValues )[number]; // getsthe type union of the possible values above

const UserSchema = new Schema<UserDto>({
    name:      {
        type:     String,
        required: true,
    },
    email:     {
        type:     String,
        required: true,
        unique:   true,
    },
    companyId: {
        type:     Schema.Types.ObjectId,
        ref:      'Company',
        required: true,
    },
    role:      {
        type:    String,
        enum:    RoleValues,
        default: 'technician',
    },
});

const User = client.model('User', UserSchema);

export { User, UserSchema };
export default User;
