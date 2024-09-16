import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerIntentDto } from './create-customer-intent.dto';

export class UpdateCustomerIntentDto extends PartialType(CreateCustomerIntentDto) {}
