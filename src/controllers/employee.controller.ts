import { Body, Delete, Example, Get, OperationId, Patch, Path, Post, Route, SuccessResponse, Tags } from 'tsoa';
import {
    CreateUserDto,
    UpdateUserDto,
    UserDto,
}                                                                                                   from '../dtos/user.dto';
import userService
                                                                                                    from '../services/user.service';
import {
    InvalidateEmpty,
    ValidateObjectIds,
}                                                                                                   from '../lib/validation.lib';
import { Types }                                                                                    from 'mongoose';
import {
    NotFoundError,
}                                                                                                   from '../middlewares/not-found.middleware';
import {
    CreateCompanyDto,
}                                                                                                   from '../dtos/company.dto';

@Route('companies/{companyId}/employees')
@Tags('employees')
export class EmployeeController {
    @Get('/')
    @SuccessResponse(200, 'Ok')
    @OperationId('listEmployees')
    public async list(@Path('companyId') companyId: Types.ObjectId): Promise<UserDto[]> {
        return userService.findAll({ companyId });
    }

    @Post('/')
    @SuccessResponse(201, 'Created')
    @OperationId('createEmployee')
    @Example<CreateUserDto>({
        name:  'John Doe',
        email: 'john.doe@mail.com',
        role:  'technician',
    })
    public async create(@Path('companyId') companyId: Types.ObjectId,
                        @Body() body: CreateUserDto): Promise<UserDto> {
        return await userService.create({ companyId, ...body });
    }

    @Get('/{userId}')
    @SuccessResponse(200, 'Ok')
    @OperationId('getEmployee')
    public async getUser(@Path('companyId') companyId: Types.ObjectId,
                         @Path() userId: Types.ObjectId): Promise<UserDto> {
        return await userService.findOne({ _id: userId, companyId });
    }

    @Patch('/{userId}')
    @SuccessResponse(200, 'Ok')
    @OperationId('updateEmployee')
    public async update(@Path('companyId') companyId: Types.ObjectId,
                        @Path('userId') userId: Types.ObjectId,
                        @Body() body: UpdateUserDto): Promise<UserDto> {
        ValidateObjectIds({ userId, companyId });
        return InvalidateEmpty(await userService.update({ _id: userId, companyId }, body));
    }

    @Delete('/{userId}')
    @SuccessResponse(204, 'No Content')
    @OperationId('deleteUser')
    public async delete(@Path() companyId: Types.ObjectId, @Path('userId') userId: Types.ObjectId): Promise<void> {
        ValidateObjectIds({ userId, companyId });
        InvalidateEmpty(await userService.delete({ _id: userId, companyId }));
    }
}

