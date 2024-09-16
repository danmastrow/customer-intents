import { Test, TestingModule } from '@nestjs/testing';
import { CustomerIntentsService } from './customer-intents.service';

describe('CustomerIntentsService', () => {
  let service: CustomerIntentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerIntentsService],
    }).compile();

    service = module.get<CustomerIntentsService>(CustomerIntentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
