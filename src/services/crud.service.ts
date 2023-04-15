import { Document, FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { InvalidateEmpty, ValidateObjectIds }               from '../lib/validation.lib';
import { Identifiable }                        from '../dtos/identifiable.dto';

type Id = Types.ObjectId | string;
type Params = Id | Record<string, Id>;
type OmitMongo<T> = Omit<T, '_id' | '__v'>;

export abstract class CrudService<DtoType extends Identifiable> {

    protected constructor(protected model: Model<DtoType>) {}

    async create(dto: Partial<DtoType>): Promise<OmitMongo<DtoType>> {
        const entity = new this.model(dto);
        InvalidateEmpty(await entity.save());

        return this.toDto(entity);
    }

    async findAll(properties?: FilterQuery<DtoType>): Promise<OmitMongo<DtoType>[]> {
        const entities = await ( properties !== undefined ? this.model.find(properties) : this.model.find() );

        return entities.map(entity => this.toDto(entity));
    }

    async findOne(params: Params, properties?: FilterQuery<DtoType>): Promise<OmitMongo<DtoType>> {
        const ids = this.formatId(params);

        const maybeEntity = await this.model.findOne({ ...ids, ...properties });
        const entity      = InvalidateEmpty<Document<Types.ObjectId, unknown, DtoType>>(maybeEntity);

        return this.toDto(entity);
    }

    async update(params: Params, dto: UpdateQuery<DtoType>): Promise<OmitMongo<DtoType>> {
        const ids = this.formatId(params);

        const maybeEntity = await this.model.findOneAndUpdate(ids, dto, { new: true });
        const entity      = InvalidateEmpty<Document<Types.ObjectId, unknown, DtoType>>(maybeEntity);

        return this.toDto(entity);
    }

    async delete(params: Params): Promise<any> {
        const ids = this.formatId(params);

        const maybeEntity = await this.model.findOneAndDelete(ids);

        return InvalidateEmpty(maybeEntity);
    }

    protected formatId(params: Params): Record<string, Id> {
        return ValidateObjectIds(typeof params === 'string' ? { _id: params } : params);
    }

    protected omitMongoProps(d: DtoType & { _id?: Types.ObjectId, __v?: number }): OmitMongo<DtoType> {
        const { _id, __v, ...data } = d;
        return data;
    }

    protected toDto(document: Document<Types.ObjectId, unknown, DtoType>): OmitMongo<DtoType> {
        return this.omitMongoProps(document.toJSON({ virtuals: true, flattenMaps: false }));
    }
}
