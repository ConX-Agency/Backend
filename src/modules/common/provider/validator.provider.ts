import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidatorProvider {
    public static async validateData(data: any, schema: any): Promise<boolean> {
        // Convert plain object to class instance
        const dto = plainToInstance(schema, data);

        // Validate the DTO
        const errors = await validate(dto);

        // Check for unknown properties
        const dtoKeys = Object.keys(new schema());
        const dataKeys = Object.keys(data);

        const unknownKeys = dataKeys.filter(key => !dtoKeys.includes(key));
        if (unknownKeys.length > 0) {
            throw new Error(`Validation failed: unknown properties - ${unknownKeys.join(', ')}`);
        }

        if (errors.length > 0) {
            const errorMessages = errors.map(err =>
                Object.values(err.constraints || {}).join(', ')
            );
            throw new Error(`Validation failed: ${errorMessages.join('; ')}`);
        }

        return true;
    }
}