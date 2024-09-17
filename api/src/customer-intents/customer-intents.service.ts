import { Injectable } from '@nestjs/common';
import { CreateCustomerIntentDto } from './dto/create-customer-intent.dto';
import { UpdateCustomerIntentDto } from './dto/update-customer-intent.dto';
import * as data from '../data/3-categorized_reasons.json'; // or use const inside the controller function
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomerIntentsService {
  create(createCustomerIntentDto: CreateCustomerIntentDto) {
    return 'This action adds a new customerIntent';
  }

  findAll() {
    return data.map(x => { return { ...x, id: uuidv4(), status: "Unreviewed" } });
  }

  findOne(id: number) {
    return `This action returns a #${id} customerIntent`;
  }

  update(id: number, updateCustomerIntentDto: UpdateCustomerIntentDto) {
    return `This action updates a #${id} customerIntent`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerIntent`;
  }
}
