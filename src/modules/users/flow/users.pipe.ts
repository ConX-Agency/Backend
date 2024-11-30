import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { UsersData } from '../model';
import { CreateUserDto } from '../model/users.dto';

export class UsersPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<CreateUserDto>({
            full_name: Joi.string().required().max(UsersData.MAX_LENGTH),
            preferred_name: Joi.string().required().max(UsersData.MAX_LENGTH),
            contact_number: Joi.string().required().max(UsersData.MAX_LENGTH),
            email_address: Joi.string().required().max(UsersData.MAX_LENGTH),
            username: Joi.string().required().max(UsersData.MAX_LENGTH),
            password: Joi.string().required().max(UsersData.MAX_LENGTH),
        });
    }
}
