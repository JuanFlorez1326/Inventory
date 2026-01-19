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
import { ProductResponse } from './interfaces/product.interface';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @ApiOperation({ summary: 'Listar productos', description: 'Devuelve todos los productos disponibles en el inventario.' })
  @ApiOkResponse({ type: [ProductResponse], description: 'Listado completo de productos.' })
  @Get()
  async getProducts(): Promise<ProductResponse[]> {
    return await firstValueFrom(
      this.productsClient.send({ cmd: 'get_products' }, {}),
    );
  }

  @ApiOperation({ summary: 'Crear producto', description: 'Crea un producto nuevo con nombre, precio y stock inicial.' })
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ type: ProductResponse, description: 'Producto creado exitosamente.' })
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponse> {
    return await firstValueFrom(
      this.productsClient.send({ cmd: 'create_product' }, createProductDto),
    );
  }

  @ApiOperation({ summary: 'Eliminar producto', description: 'Elimina un producto por su identificador.' })
  @ApiParam({ name: 'id', description: 'UUID del producto', example: '6f1b3a0a-8c6f-4d82-9a4b-6f52b4e8c1d2' })
  @ApiOkResponse({
    description: 'Confirmación de eliminación',
    schema: {
      example: {
        message: 'Product with ID 6f1b3a0a-8c6f-4d82-9a4b-6f52b4e8c1d2 has been deleted',
      },
    },
  })
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    return await firstValueFrom(
      this.productsClient.send({ cmd: 'delete_product' }, id),
    );
  }
}
