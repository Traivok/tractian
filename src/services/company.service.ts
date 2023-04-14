import { CompanyDto, CreateCompanyDto } from '../dtos/company.dto';
import Company                          from '../repositories/company.repo';
import { Types }                        from 'mongoose';

class CompanyService {
    async create(dto: CreateCompanyDto): Promise<CompanyDto | null> {
        const company = new Company(dto);
        await company.save();
        return company.toJSON({ flattenMaps: false, virtuals: true });
    }

    async findAll(industry?: string): Promise<CompanyDto[]> {
        if (industry !== undefined) {
            return Company.find({ industry }).lean();
        } else {
            return Company.find().lean();
        }
    }

    async findOne(id: Types.ObjectId): Promise<CompanyDto | null> {
        const maybeCompany = await Company.findById(id);

        if (maybeCompany === null) {
            return null;
        }

        return maybeCompany.toJSON({ flattenMaps: false, virtuals: true });
    }
}

export default new CompanyService();
