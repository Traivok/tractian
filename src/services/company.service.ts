import { CompanyDto}   from '../dtos/company.dto';
import { CrudService } from './crud.service';
import Company         from '../repositories/company.repo';

class CompanyService extends CrudService<CompanyDto> {
    constructor() {
        super(Company);
    }

}
// class CompanyService {
//     async findAll(industry?: string): Promise<CompanyDto[]> {
//         const companies = await ( industry ?
//                                   Company.find({ industry }) :
//                                   Company.find() );
//
//         return companies.map(company => company.toJSON({ flattenMaps: false, virtuals: true }));
//     }
//
//     async findOne(id: Types.ObjectId): Promise<CompanyDto | undefined> {
//         const maybeCompany = await Company.findById(id);
//
//         if (maybeCompany) {
//             return maybeCompany.toJSON({ flattenMaps: false, virtuals: true });
//         }
//     }
//
//     async create(dto: CreateCompanyDto): Promise<CompanyDto | null> {
//         const company = new Company(dto);
//         await company.save();
//         return company.toJSON({ flattenMaps: false, virtuals: true });
//     }
//
//     async update(id: Types.ObjectId, dto: UpdateCompanyDto): Promise<CompanyDto | undefined> {
//         ValidateObjectIds({ id });
//         const company = await Company.findByIdAndUpdate(id, dto, { new: true });
//
//         if (company) {
//             return company.toJSON({ flattenMaps: false, virtuals: true });
//         }
//     }
//
//     async delete(id: Types.ObjectId): Promise<CompanyDto | null> {
//         return Company.findOneAndDelete(( { _id: id } ));
//     }
// }

export default new CompanyService();
