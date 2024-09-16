import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerIntentsService } from './customer-intents.service';
import { CreateCustomerIntentDto } from './dto/create-customer-intent.dto';
import { UpdateCustomerIntentDto } from './dto/update-customer-intent.dto';

@Controller('customer-intents')
export class CustomerIntentsController {
  constructor(private readonly customerIntentsService: CustomerIntentsService) {}

  @Post()
  create(@Body() createCustomerIntentDto: CreateCustomerIntentDto) {
    return this.customerIntentsService.create(createCustomerIntentDto);
  }

  @Get()
  findAll() {
    return this.customerIntentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerIntentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerIntentDto: UpdateCustomerIntentDto) {
    return this.customerIntentsService.update(+id, updateCustomerIntentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerIntentsService.remove(+id);
  }
}
