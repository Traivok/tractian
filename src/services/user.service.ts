import { UserDto }     from '../dtos/user.dto';
import User            from '../repositories/user.repo';
import { CrudService } from './crud.service';

class UserService extends CrudService<UserDto> {
    constructor() {
        super(User);
    }
}

export default new UserService();
