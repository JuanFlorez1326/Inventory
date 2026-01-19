import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PRODUCTS_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.PRODUCTS_SERVICE_PORT || '3001'),
        },
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class GatewayModule {}
