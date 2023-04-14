import { Body, Example, Get, Path, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import Company                                                                    from '../repositories/company.repo';
import { CompanyDto, CreateCompanyDto }                                           from '../dtos/company.dto';
import { Controller }                                                             from '@tsoa/runtime';
import { Types }                                                                  from 'mongoose';
import CompanyService                                                             from '../services/company.service';


@Route('companies')
@Tags('companies')
export class CompanyController extends Controller {
    private readonly companyService = CompanyService;

    @Get('/')
    @SuccessResponse(200, 'Ok')
    public async getAllCompanies(): Promise<CompanyDto[]> {
        return Company.find().lean();
    }

    @Post('/')
    @SuccessResponse(201, 'Created')
    @Example<CreateCompanyDto>({
        name:        'Industria Freios Supremos',
        description: 'Freios e ABS.',
        industry:    'auto parts manufacturer',
    })
    public async saveCompany(@Body() body: CreateCompanyDto): Promise<CompanyDto> {
        const company = new Company(body);
        await company.save();
        return company.toJSON({ flattenMaps: false, virtuals: true });
    }

    @Get('/{companyId}')
    @SuccessResponse(200, 'Ok')
    @Response(404, 'Company Not Found.')
    public async getCompany(@Path('companyId') companyId: Types.ObjectId): Promise<CompanyDto | undefined> {
        if (!Types.ObjectId.isValid(companyId)) {
            this.setStatus(400);
            return;
        }

        const maybeCompany = await this.companyService.findOne(companyId);

        if (maybeCompany === null) {
            this.setStatus(404);
            return;
        }

        return maybeCompany;
    }
}

