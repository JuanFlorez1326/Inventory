import { Test, TestingModule } from '@nestjs/testing';
import { ProductsModule } from './products.module';

describe('ProductsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should compile successfully', async () => {
    expect(module).toBeDefined();
  });
});
