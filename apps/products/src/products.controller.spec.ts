import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 100,
    stock: 10,
  };

  const mockProductsService = {
    findAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);

    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const products = [mockProduct];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(products);

      const result = await controller.getProducts();

      expect(result).toEqual(products);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no products exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);

      const result = await controller.getProducts();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('createProduct', () => {
    it('should create and return a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'New Product',
        price: 50,
        stock: 5,
      };

      const createdProduct = { id: '1', ...createProductDto };
      jest.spyOn(service, 'create').mockResolvedValueOnce(createdProduct);

      const result = await controller.createProduct(createProductDto);

      expect(result).toEqual(createdProduct);
      expect(service.create).toHaveBeenCalledWith(createProductDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product and return success message', async () => {
      const deleteResponse = {
        deleted: true,
        message: 'Product with ID 1 has been deleted',
      };
      jest.spyOn(service, 'delete').mockResolvedValueOnce(deleteResponse);

      const result = await controller.deleteProduct('1');

      expect(result).toEqual(deleteResponse);
      expect(service.delete).toHaveBeenCalledWith('1');
      expect(service.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when product does not exist', async () => {
      jest
        .spyOn(service, 'delete')
        .mockRejectedValueOnce(
          new NotFoundException('Product with ID invalid-id not found'),
        );

      await expect(controller.deleteProduct('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(service.delete).toHaveBeenCalledWith('invalid-id');
    });
  });
});
