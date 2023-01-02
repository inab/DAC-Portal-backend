import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './infrastructure/config/env.config';
import { JoiValidationSchema } from './infrastructure/config/joi.validation';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema,
    }),
    ControllersModule
  ],
})
export class AppModule {}



