import { Body, Get, Path, Post, Route, SuccessResponse } from 'tsoa';
import { User }                                          from '../repositories/user.repo';
import Company                                           from '../repositories/company.repo';

@Route('companies')
export class CompanyController {
    // @Get('/')
    // @SuccessResponse(200, 'Ok')
    // public async getAll(): Promise<Company[]> {
    //     return await Company.find({});
    // }
    //
    // @Post('/')
    // @SuccessResponse(201, 'Created')
    // public async saveUser(@Body() body: { name: string, email: string }): Promise<{ name: string }> {
    //     const user = new User(body);
    //     await user.save();
    //     return user;
    // }
    //
    // @Get('/{userId}')
    // @SuccessResponse(200, 'Ok')
    // public async getUser(@Path() userId: number): Promise<{ message: string }> {
    //     return { message: `${ 2 * userId }` };
    // }
}

