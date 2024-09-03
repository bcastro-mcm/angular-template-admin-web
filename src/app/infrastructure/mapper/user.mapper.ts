import { IUserAuth } from "@infrastructure/dto/users.dto";
import { MapperError } from "@models/public.model";
import { AppText } from "@utils/app-text";

export class UserMapper {

    public static toIUser(input: any): IUserAuth {

        // Check for existence of each field
        if (!('email' in input)) {
            throw new MapperError( AppText.mising_field('email','Usuario'));
        }
        if (!('_id' in input)) {
            throw new MapperError( AppText.mising_field('_id','Usuario'));
        }
        if (!('first_name' in input)) {
            throw new MapperError( AppText.mising_field('first_name','Usuario'));
        }
        if (!('last_name' in input)) {
            throw new MapperError( AppText.mising_field('last_name','Usuario'));
        }
        if (!('role' in input)) {
            throw new MapperError( AppText.mising_field('role','Usuario'));
        }
        if (!('token' in input)) {
            throw new MapperError( AppText.mising_field('token','Usuario'));
        }

        // Check type of each field
        if (typeof input._id !== 'string') {
            throw new MapperError('Invalid type for _id, expected string.');
        }
        if (typeof input.email !== 'string') {
            throw new MapperError('Invalid type for email, expected string.');
        }
        if (typeof input.first_name !== 'string') {
            throw new MapperError('Invalid type for first_name, expected string.');
        }
        if (typeof input.last_name !== 'string') {
            throw new MapperError('Invalid type for last_name, expected string.');
        }
        if (typeof input.role !== 'string') {
            throw new MapperError('Invalid type for role, expected string.');
        }
        if (typeof input.token !== 'string') {
            throw new MapperError('Invalid type for token, expected string.');
        }

        return input;
    }
}