import {
    Body, Delete,
    Example,
    Get,
    OperationId,
    Patch,
    Path,
    Post,
    Query,
    Response,
    Route,
    SuccessResponse,
    Tags,
}                                                         from 'tsoa';
import { CompanyDto, CreateCompanyDto, UpdateCompanyDto } from '../dtos/company.dto';
import { Controller }                                     from '@tsoa/runtime';
import { Types }                                          from 'mongoose';
import CompanyService                                     from '../services/company.service';
import companyService                                     from '../services/company.service';
import { InvalidateEmpty, ValidateObjectIds }             from '../lib/validation.lib';


@Route('companies')
@Tags('companies')
export class CompanyController extends Controller {

    @Get('/')
    @SuccessResponse(200, 'Ok')
    @OperationId('listCompanies')
    public async list(@Query() industry?: string): Promise<CompanyDto[]> {
        if (industry === undefined) {
            const out = await companyService.findAll();
            console.log({ out });
            return out;
        }
        else
            return await  companyService.findAll({ industry });
    }

    @Post('/')
    @SuccessResponse(201, 'Created')
    @Example<CreateCompanyDto>({
        name:        'Industria Freios Supremos',
        description: 'Freios e ABS.',
        industry:    'auto parts manufacturer',
    })
    @OperationId('createCompany')
    public async create(@Body() body: CreateCompanyDto): Promise<CompanyDto> {
        return await  await companyService.create(body);
    }

    @Patch('/{companyId}')
    @SuccessResponse(200, 'Ok')
    @Example<CreateCompanyDto>({
        name:        'Industria Freios Supremos',
        description: 'Freios e ABS.',
        industry:    'auto parts manufacturer',
    })
    @OperationId('createCompany')
    public async update(@Path() companyId: Types.ObjectId, @Body() body: UpdateCompanyDto): Promise<CompanyDto> {
        return await  await companyService.update(companyId, body);
    }

    @Delete('/{companyId}')
    @SuccessResponse(204, 'No Content')
    @OperationId('deleteCompany')
    public async delete(@Path() companyId: Types.ObjectId): Promise<void> {
        await companyService.delete(companyId);
    }

    @Get('/{companyId}')
    @SuccessResponse(200, 'Ok')
    @Response(404, 'Company Not Found')
    @Response(400, 'Bad Request')
    @OperationId('getCompany')
    public async get(@Path('companyId') companyId: Types.ObjectId): Promise<CompanyDto> {
        return await  await companyService.findOne(companyId);
    }
}

