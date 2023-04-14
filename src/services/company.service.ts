import { CompanyDto}   from '../dtos/company.dto';
import { CrudService } from './crud.service';
import Company         from '../repositories/company.repo';

class CompanyService extends CrudService<CompanyDto> {
    constructor() {
        super(Company);
    }

}

export default new CompanyService();
