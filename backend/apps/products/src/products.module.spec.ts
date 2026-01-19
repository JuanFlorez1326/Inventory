import { Test, TestingModule } from '@nestjs/testing';
import { ProductsModule } from './products.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

describe('ProductsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();
  });

  afterEach(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should compile successfully', () => {
    expect(module).toBeDefined();
    expect(module.get(ProductsController)).toBeDefined();
  });
});
