import { ApiProperty } from '@nestjs/swagger';

export class ProductResponse {
  @ApiProperty({
    description: 'Identificador único del producto (UUID)',
    example: '6f1b3a0a-8c6f-4d82-9a4b-6f52b4e8c1d2',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre legible del producto',
    example: 'Laptop Lenovo ThinkPad X1',
  })
  name: string;

  @ApiProperty({
    description: 'Precio unitario en USD',
    example: 1299.99,
    type: Number,
  })
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 25,
    type: Number,
  })
  stock: number;
}