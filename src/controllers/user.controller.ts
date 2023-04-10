import { Get, Path, Route, SuccessResponse } from 'tsoa';

@Route('users')
export class UserController {
    @Get('/')
    @SuccessResponse(200, 'Ok')
    public async getAllUsers(): Promise<{ message: string }> {
        return { message: 'Hello World' };
    }

    @Get('/{userId}')
    @SuccessResponse(200, 'Ok')
    public async getUser(@Path() userId: number): Promise<{ message: string }> {
        return { message: `${ 2 * userId }` };
    }
}

