import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @Get()
  async getProducts(): Promise<any> {
    return await firstValueFrom(
      this.productsClient.send({ cmd: 'get_products' }, {}),
    );
  }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<any> {
    return await firstValueFrom(
      this.productsClient.send({ cmd: 'create_product' }, createProductDto),
    );
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<any> {
    return await firstValueFrom(
      this.productsClient.send({ cmd: 'delete_product' }, id),
    );
  }
}
