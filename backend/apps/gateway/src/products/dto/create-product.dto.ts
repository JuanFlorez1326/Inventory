import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre legible del producto',
    example: 'Laptop Lenovo ThinkPad X1',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Precio unitario en USD',
    example: 1299.99,
    minimum: 0,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 25,
    minimum: 0,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;
}
