import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

import { environments } from './environments';
import config from './config';

@Module({
  imports: [
    ProductModule,
    UsersModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required,
        DATABASE_NAME: Joi.string().required,
        DATABASE_PORT: Joi.number().required,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = await http.get(
          'http://jsonplaceholder.typicode.com/todos',
        );

        return request;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
