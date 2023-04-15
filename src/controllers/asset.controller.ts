import { Body, Delete, Example, Get, OperationId, Patch, Path, Post, Query, Route, SuccessResponse, Tags } from 'tsoa';
import {
    ValidateObjectIds,
}                                                                                                          from '../lib/validation.lib';
import {
    Types,
}                                                                                                          from 'mongoose';
import {
    AssetDto, CreateAssetDto, UpdateAssetDto,
}                                                                                                          from '../dtos/asset.dto';
import assetService
                                                                                                           from '../services/asset.service';
import {
    StatusType,
}                                                                                                          from '../repositories/asset.repo';

@Route()
@Tags('assets')
export class AssetController {
    @Get('/assets?low_life')
    @SuccessResponse(200, 'Ok')
    @OperationId('lisLowHealthAssets')
    public async listLowHealth(@Query() lowHealthThreshold: number): Promise<AssetDto[]> {
        return assetService.findByLowHealth(lowHealthThreshold);
    }

    @Get('/assets?needing_maintenance')
    @SuccessResponse(200, 'Ok')
    @OperationId('lisLowHealthAssets')
    public async listNeedingMaintenance(): Promise<AssetDto[]> {
        return assetService.findAll({ needMaintenance: true });
    }

    @Get('/units/{unitId}/assets')
    @SuccessResponse(200, 'Ok')
    @OperationId('listAssets')
    public async list(@Path('unitId') unitId: Types.ObjectId,
                      @Query() status?: StatusType): Promise<AssetDto[]> {
        if (status === undefined)
            return assetService.findAll({ unitId });
        else
            return assetService.findAll({ status, unitId });
    }

    @Post('/units/{unitId}/assets')
    @SuccessResponse(201, 'Created')
    @OperationId('createEmployee')
    @Example<CreateAssetDto>({
        name:         'Pressure Sensor',
        description:  'Miniature Barometer',
        health:       72,
        imageUrl:     'https://upload.wikimedia.org/wikipedia/commons/c/cb/Digital_Barometer_Sensor.jpg',
        manufacturer: 'Sensors SA',
        model:        'sensor x',
        purchaseDate: new Date(),
        serialCode:   'abc-123',
        status:       'Running',

    })
    public async create(@Path('unitId') unitId: Types.ObjectId,
                        @Body() body: CreateAssetDto): Promise<AssetDto> {
        ValidateObjectIds({ unitId });
        return await assetService.create({ unitId, ...body });
    }

    @Get('/units/{unitId}/assets/{assetId}')
    @SuccessResponse(200, 'Ok')
    @OperationId('getAsset')
    public async getAsset(@Path('unitId') unitId: Types.ObjectId,
                          @Path() assetId: Types.ObjectId): Promise<AssetDto> {
        return await assetService.findOne({ _id: assetId, unitId });
    }

    @Patch('/units/{unitId}/assets/{assetId}')
    @SuccessResponse(200, 'Ok')
    @OperationId('updateAsset')
    public async update(@Path('unitId') unitId: Types.ObjectId,
                        @Path('assetId') assetId: Types.ObjectId,
                        @Body() body: UpdateAssetDto): Promise<AssetDto> {
        return await assetService.update({ _id: assetId, unitId }, body);
    }

    @Delete('/units/{unitId}/assets/{assetId}')
    @SuccessResponse(204, 'No Content')
    @OperationId('deleteAsset')
    public async delete(@Path('unitId') unitId: Types.ObjectId,
                        @Path('assetId') assetId: Types.ObjectId): Promise<void> {
        await assetService.delete({ _id: assetId, unitId });
    }
}

