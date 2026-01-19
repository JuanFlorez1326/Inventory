import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'get_products' })
  async getProducts() {
    return await this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'create_product' })
  async createProduct(createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  async deleteProduct(id: string) {
    return await this.productsService.delete(id);
  }
}
