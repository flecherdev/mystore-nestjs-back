import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CustomerController } from './controllers/customers.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { ProductModule } from 'src/products/product.module';

@Module({
  imports: [ProductModule],
  controllers: [UsersController, CustomerController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
