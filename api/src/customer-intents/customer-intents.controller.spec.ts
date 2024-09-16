import { Test, TestingModule } from '@nestjs/testing';
import { CustomerIntentsController } from './customer-intents.controller';
import { CustomerIntentsService } from './customer-intents.service';

describe('CustomerIntentsController', () => {
  let controller: CustomerIntentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerIntentsController],
      providers: [CustomerIntentsService],
    }).compile();

    controller = module.get<CustomerIntentsController>(CustomerIntentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
