import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { of } from 'rxjs';

describe('Gateway ProductsController', () => {
  let controller: ProductsController;
  let productsClient: ClientProxy;

  const mockProductResponse = {
    id: '1',
    name: 'Test Product',
    price: 100,
    stock: 10,
  };

  const mockProductsClient = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: 'PRODUCTS_SERVICE',
          useValue: mockProductsClient,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsClient = module.get<ClientProxy>('PRODUCTS_SERVICE');

    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const products = [mockProductResponse];
      jest.spyOn(productsClient, 'send').mockReturnValueOnce(of(products));

      const result = await controller.getProducts();

      expect(result).toEqual(products);
      expect(productsClient.send).toHaveBeenCalledWith(
        { cmd: 'get_products' },
        {},
      );
    });

    it('should return an empty array when no products exist', async () => {
      jest.spyOn(productsClient, 'send').mockReturnValueOnce(of([]));

      const result = await controller.getProducts();

      expect(result).toEqual([]);
      expect(productsClient.send).toHaveBeenCalledTimes(1);
    });
  });

  describe('createProduct', () => {
    it('should create and return a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'New Product',
        price: 50,
        stock: 5,
      };

      jest
        .spyOn(productsClient, 'send')
        .mockReturnValueOnce(of(mockProductResponse));

      const result = await controller.createProduct(createProductDto);

      expect(result).toEqual(mockProductResponse);
      expect(productsClient.send).toHaveBeenCalledWith(
        { cmd: 'create_product' },
        createProductDto,
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product and return success message', async () => {
      const deleteResponse = {
        message: 'Product with ID 1 has been deleted',
      };

      jest
        .spyOn(productsClient, 'send')
        .mockReturnValueOnce(of(deleteResponse));

      const result = await controller.deleteProduct('1');

      expect(result).toEqual(deleteResponse);
      expect(productsClient.send).toHaveBeenCalledWith(
        { cmd: 'delete_product' },
        '1',
      );
    });

    it('should handle product not found error', async () => {
      jest.spyOn(productsClient, 'send').mockReturnValueOnce(
        of({
          error: 'Product not found',
        }),
      );

      const result = await controller.deleteProduct('invalid-id');

      expect(result).toBeDefined();
      expect(productsClient.send).toHaveBeenCalledWith(
        { cmd: 'delete_product' },
        'invalid-id',
      );
    });
  });
});
