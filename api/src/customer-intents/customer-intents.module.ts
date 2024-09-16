import { Module } from '@nestjs/common';
import { CustomerIntentsService } from './customer-intents.service';
import { CustomerIntentsController } from './customer-intents.controller';

@Module({
  controllers: [CustomerIntentsController],
  providers: [CustomerIntentsService]
})
export class CustomerIntentsModule {}
