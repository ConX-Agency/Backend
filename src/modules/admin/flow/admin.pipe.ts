import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { AdminData } from '../model';
import { CreateAdminDto } from '../model/admin.dto';

export class AdminPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<CreateAdminDto>({
            full_name: Joi.string().required().max(AdminData.MAX_LENGTH),
            preferred_name: Joi.string().required().max(AdminData.MAX_LENGTH),
            contact_number: Joi.string().required().max(AdminData.MAX_LENGTH),
            email_address: Joi.string().required().max(AdminData.MAX_LENGTH)
        });
    }
}
