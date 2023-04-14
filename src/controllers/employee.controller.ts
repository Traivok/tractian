import { Body, Get, OperationId, Path, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { CreateUserDto, UserDto }                                           from '../dtos/user.dto';
import userService                                                          from '../services/user.service';
import { InvalidateEmpty, ValidateObjectIds }                               from '../lib/validation.lib';
import { Types }                                                            from 'mongoose';
import { NotFoundError }                                                    from '../middlewares/not-found.middleware';

@Route('companies/{companyId}/employees')
@Tags('employees')
export class EmployeeController {
    @Get('/')
    @SuccessResponse(200, 'Ok')
    @OperationId('listEmployees')
    public async list(@Path('companyId') companyId: Types.ObjectId): Promise<UserDto[]> {
        ValidateObjectIds({ companyId });
        return userService.findAll(companyId);
    }

    @Post('/')
    @SuccessResponse(201, 'Created')
    public async create(@Path('companyId') companyId: Types.ObjectId,
                        @Body() body: CreateUserDto): Promise<UserDto> {
        return InvalidateEmpty(await userService.create(companyId, body));
    }

    @Get('/{userId}')
    @SuccessResponse(200, 'Ok')
    @OperationId('getEmployee')
    public async getUser(@Path('companyId') companyId: Types.ObjectId,
                         @Path() userId: Types.ObjectId): Promise<UserDto> {
        ValidateObjectIds({ userId, companyId });
        const user = InvalidateEmpty(await userService.findOne(userId));

        // Checks if found user is employee of a company
        if (!companyId.equals(user.companyId)) {
            throw new NotFoundError('No users found affiliated with this company');
        }

        return user;
    }
}

