import { Document, Model, Types, UpdateQuery } from 'mongoose';
import { InvalidateEmpty, ValidateObjectIds }  from '../lib/validation.lib';
import { Identifiable }                        from '../dtos/identifiable.dto';

type Id = Types.ObjectId | string;
type Params = Id | Record<string, Id>;

export abstract class CrudService<DtoType extends Identifiable> {

    protected constructor(private model: Model<DtoType>) {}

    async create(dto: Partial<DtoType>): Promise<DtoType> {
        const entity = new this.model(dto);
        await entity.save();
        return InvalidateEmpty(entity.toJSON({ flattenMaps: false, virtuals: true }));
    }

    async findAll(properties?: Partial<DtoType>): Promise<DtoType[]> {
        const entities = await ( properties !== undefined ? this.model.find(properties) : this.model.find() );

        return entities.map(entity => entity.toJSON({ flattenMaps: false, virtuals: true }));
    }

    async findOne(params: Params, properties?: Partial<DtoType>): Promise<DtoType> {
        const ids = this.formatId(params);

        const maybeEntity = await this.model.findOne({ ...ids, ...properties });
        const entity      = InvalidateEmpty<Document<Types.ObjectId, unknown, DtoType>>(maybeEntity);

        return entity.toJSON({ flattenMaps: false, virtuals: true });
    }

    async update(params: Params, dto: UpdateQuery<DtoType>): Promise<DtoType> {
        const ids = this.formatId(params);
        console.log(ids);

        const maybeEntity = await this.model.findOneAndUpdate(ids, dto, { new: true });
        console.log(maybeEntity);
        const entity = InvalidateEmpty<Document<Types.ObjectId, unknown, DtoType>>(maybeEntity);

        return entity.toJSON({ flattenMaps: false, virtuals: true });
    }

    async delete(params: Params): Promise<any> {
        const ids = this.formatId(params);

        const maybeEntity = await this.model.findOneAndDelete(ids);

        return InvalidateEmpty(maybeEntity);
    }

    private formatId(params: Params): Record<string, Id> {
        return ValidateObjectIds(typeof params === 'string' ? { _id: params } : params);
    }


}
