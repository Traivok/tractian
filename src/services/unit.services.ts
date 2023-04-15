import { CrudService } from './crud.service';
import Unit            from '../repositories/unit.repo';
import { UnitDto }     from '../dtos/unit.dto';

class UnitService extends CrudService<UnitDto> {
    constructor() {
        super(Unit);
    }
}

export default new UnitService();
