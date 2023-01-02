import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from '../../entities/request.entity';
import { UserPermissions, UserPermissionsSchema } from '../../entities/permission.entity';
import { Dac, DacSchema } from '../../../infrastructure/entities/dac.entity';
import { Policy, PolicySchema } from '../../../infrastructure/entities/policy.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Dac.name,
          schema: DacSchema,
          collection: 'dacs',
        },
        {
          name: Policy.name,
          schema: PolicySchema,
          collection: 'policies',
        },
        {
          name: Request.name,
          schema: RequestSchema,
          collection: 'requests',
        },
      ],
      'dac-portal-api',
    ),
    MongooseModule.forFeature(
      [
        {
          name: UserPermissions.name,
          schema: UserPermissionsSchema,
          collection: 'userPermissions',
        },
      ],
      'permissions-api',
    ),
    MongooseModule.forRootAsync({
      connectionName: 'dac-portal-api',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_DAC_PORTAL'),
      }),
    }),
    MongooseModule.forRootAsync({
      connectionName: 'permissions-api',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_PERMISSIONS_API'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
