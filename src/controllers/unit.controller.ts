import { Body, Delete, Example, Get, OperationId, Patch, Path, Post, Route, SuccessResponse, Tags } from 'tsoa';
import {
    ValidateObjectIds,
}                                                                                                   from '../lib/validation.lib';
import { Types }                                                                                    from 'mongoose';
import unitService
                                                                                                    from '../services/unit.services';
import {
    CreateUnitDto,
    UnitDto,
    UpdateUnitDto,
}                                                                                                   from '../dtos/unit.dto';

@Route('companies/{companyId}/units')
@Tags('units')
export class UnitController {
    @Get('/')
    @SuccessResponse(200, 'Ok')
    @OperationId('listUnits')
    public async list(@Path('companyId') companyId: Types.ObjectId): Promise<UnitDto[]> {
        return unitService.findAll({ companyId });
    }

    @Post('/')
    @SuccessResponse(201, 'Created')
    @OperationId('createEmployee')
    @Example<CreateUnitDto>({
        name:        'Unit 02',
        location:    'New Tokyo',
        description: 'Advanced Technology',
    })
    public async create(@Path('companyId') companyId: Types.ObjectId,
                        @Body() body: CreateUnitDto): Promise<UnitDto> {
        ValidateObjectIds({ companyId });
        return await unitService.create({ companyId, ...body });
    }

    @Get('/{unitId}')
    @SuccessResponse(200, 'Ok')
    @OperationId('getUnit')
    public async getUnit(@Path('companyId') companyId: Types.ObjectId,
                         @Path() unitId: Types.ObjectId): Promise<UnitDto> {
        return await unitService.findOne({ _id: unitId, companyId });
    }

    @Patch('/{unitId}')
    @SuccessResponse(200, 'Ok')
    @OperationId('updateUnit')
    public async update(@Path('companyId') companyId: Types.ObjectId,
                        @Path('unitId') unitId: Types.ObjectId,
                        @Body() body: UpdateUnitDto): Promise<UnitDto> {
        return await unitService.update({ _id: unitId, companyId }, body);
    }

    @Delete('/{unitId}')
    @SuccessResponse(204, 'No Content')
    @OperationId('deleteUnit')
    public async delete(@Path() companyId: Types.ObjectId, @Path('unitId') unitId: Types.ObjectId): Promise<void> {
        await unitService.delete({ _id: unitId, companyId });
    }
}

