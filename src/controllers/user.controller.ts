import { Body, Get, Path, Post, Route, SuccessResponse } from 'tsoa';
import { User }                                          from '../repositories/user.repo';

@Route('users')
export class UserController {
    @Get('/')
    @SuccessResponse(200, 'Ok')
    public async getAllUsers(): Promise<{ name: string }[]> {
        return await User.find({});
    }

    @Post('/')
    @SuccessResponse(201, 'Created')
    public async saveUser(@Body() body: { name: string, email: string }): Promise<{ name: string }> {
        const user = new User(body);
        await user.save();
        return user;
    }

    @Get('/{userId}')
    @SuccessResponse(200, 'Ok')
    public async getUser(@Path() userId: number): Promise<{ message: string }> {
        return { message: `${ 2 * userId }` };
    }
}

