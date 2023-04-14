import { Body, Example, Get, OperationId, Path, Post, Query, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { CompanyDto, CreateCompanyDto }                                                               from '../dtos/company.dto';
import { Controller }                                                             from '@tsoa/runtime';
import { Types }                                                                  from 'mongoose';
import CompanyService                                                             from '../services/company.service';
import companyService                                                             from '../services/company.service';
import { InvalidateEmpty, ValidateObjectIds }                                     from '../lib/validation.lib';


@Route('companies')
@Tags('companies')
export class CompanyController extends Controller {
    private readonly companyService = CompanyService;

    @Get('/')
    @SuccessResponse(200, 'Ok')
    @OperationId('listCompanies')
    public async list(@Query() industry?: string): Promise<CompanyDto[]> {
        return companyService.findAll(industry);
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
        const company = await companyService.create(body);

        return InvalidateEmpty(company);
    }

    @Get('/{companyId}')
    @SuccessResponse(200, 'Ok')
    @Response(404, 'Company Not Found')
    @Response(400, 'Bad Request')
    @OperationId('getCompany')
    public async get(@Path('companyId') companyId: Types.ObjectId): Promise<CompanyDto> {
        ValidateObjectIds({ companyId });

        const maybeCompany = await this.companyService.findOne(companyId);

        return InvalidateEmpty(maybeCompany);
    }
}

