import { CompanyDto, CreateCompanyDto, UpdateCompanyDto } from '../dtos/company.dto';
import Company                                            from '../repositories/company.repo';
import { Types }                                          from 'mongoose';
import { ValidateObjectIds }                              from '../lib/validation.lib';

class CompanyService {
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

    async create(dto: CreateCompanyDto): Promise<CompanyDto | null> {
        const company = new Company(dto);
        await company.save();
        return company.toJSON({ flattenMaps: false, virtuals: true });
    }

    async update(id: Types.ObjectId, dto: UpdateCompanyDto): Promise<CompanyDto | null> {
        ValidateObjectIds({id});
        return Company.findByIdAndUpdate(id, dto, { new: true });
    }

    async delete(id: Types.ObjectId): Promise<CompanyDto | null> {
        return Company.findByIdAndDelete(id);

    }
}

export default new CompanyService();
