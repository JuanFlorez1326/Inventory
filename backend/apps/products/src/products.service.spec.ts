import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 100,
    stock: 10,
  };

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [mockProduct, { ...mockProduct, id: '2' }];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(products);

      const result = await service.findAll();

      expect(result).toEqual(products);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no products exist', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create and return a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'New Product',
        price: 50,
        stock: 5,
      };

      jest.spyOn(repository, 'create').mockReturnValueOnce({
        ...createProductDto,
        id: '1',
      } as Product);

      jest.spyOn(repository, 'save').mockResolvedValueOnce({
        ...createProductDto,
        id: '1',
      } as Product);

      const result = await service.create(createProductDto);

      expect(result).toBeDefined();
      expect(result.name).toBe(createProductDto.name);
      expect(repository.create).toHaveBeenCalledWith(createProductDto);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a product and return success message', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockProduct);
      jest.spyOn(repository, 'remove').mockResolvedValueOnce(mockProduct);

      const result = await service.delete('1');

      expect(result).toEqual({
        deleted: true,
        message: 'Product with ID 1 has been deleted',
      });
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(repository.remove).toHaveBeenCalledWith(mockProduct);
    });

    it('should throw NotFoundException when product does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.delete('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.delete('invalid-id')).rejects.toThrow(
        'Product with ID invalid-id not found',
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 'invalid-id' },
      });
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
