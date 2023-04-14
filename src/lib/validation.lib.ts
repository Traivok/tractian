import { Types }         from 'mongoose';
import { ValidateError } from '@tsoa/runtime';
import { NotFoundError } from '../middlewares/not-found.middleware';

/**
 * @desc Throws {ValidateError} if some id does not match MongoDB.ObjectId spec.
 * @throws ValidateError
 */
export function ValidateObjectIds(ids: Record<string, any>): Record<string, Types.ObjectId> {
    for (const idKey of Object.keys(ids)) {
        const maybeId = ids[idKey];

        if (!Types.ObjectId.isValid(maybeId)) {
            throw new ValidateError({
                [idKey]: { message: 'not ObjectId', value: maybeId },
            }, 'Id does not match MongoDB.ObjectId');
        }
    }

    return ids;
}

/**
 * @desc Throws {ValidateError} if some id does not match MongoDB.ObjectId spec.
 * @throws NotFound
 */
export function InvalidateEmpty<T>(content?: T | undefined | null, validateEmpties = false): NonNullable<T> {
    const emptyContent = validateEmpties && ( isEmptyArray(content) || isEmptyObject(content) );

    if (content === null || content === undefined || emptyContent) {
        throw new NotFoundError('Content Not Found', content);
    }

    return content;
}

function isEmptyArray(value: unknown): boolean {
    return Array.isArray(value) && value.length === 0;
}

function isEmptyObject(value: unknown): boolean {
    return ( value !== null ) && ( typeof value === 'object' ) && Object.keys(value).length === 0;
}

