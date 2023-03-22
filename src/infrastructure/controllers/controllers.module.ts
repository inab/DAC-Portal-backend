import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetDACInfo } from '../../application/info/GetDACInfo';
import { UpdateDACInfo } from '../../application/info/UpdateDACInfo';
import { FindPolicyById } from '../../application/policies/FindPolicyById';
import { FindPolicyByFileId } from '../../application/policies/FindPolicyByFileId';
import { GetAllPolicies } from '../../application/policies/GetAllPolicies';
import { UpdatePolicyById } from '../../application/policies/UpdatePolicyById';
import { RejectAccessRequest } from '../../application/requests/RejectAccessRequest';
import { AcceptAccessRequest } from '../../application/requests/AcceptAccessRequest';
import { CreateAccessRequest } from '../../application/requests/CreateAccessRequest';
import { RevokeUserPermissions } from '../../application/requests/RevokeUserPermissions';
import { GetRequestsByStatus } from '../../application/requests/GetRequestsByStatus';
import { GetRequestById } from '../../application/requests/GetRequestById';
import { RequestsDacController } from './requests/dac/requests.controller';
import { RequestsUserController } from './requests/user/requests.controller';
import { PoliciesDacController } from './policies/dac/policies.controller';
import { PoliciesUserController } from './policies/user/policies.controller';
import { InfoController } from './info/info.controller';
import { IInfoRepositoryToken } from '../../domain/ports/repositories/info/info.interfaces';
import { InfoRepository } from '../repositories/info/info.repository';
import { configToken } from '../config/env.config';
import { IPoliciesRepositoryToken } from '../../domain/ports/repositories/policies/policies.interfaces';
import { PoliciesRepository } from '../repositories/policies/policies.repository';
import { RequestsRepository } from '../repositories/requests/requests.repository';
import { IRequestsRepositoryToken } from '../../domain/ports/repositories/requests/requests.interfaces';
import { MockAuthModule } from '../services/auth/auth.module.mock';
import { DatabaseModule } from '../helpers/database/mongoose.module';
import { KCAuthModule } from '../helpers/auth/keycloak.module';

@Module({
  imports: [
    ConfigModule,
    MockAuthModule,
    DatabaseModule,
    KCAuthModule
  ],
  providers: [
    GetDACInfo,
    UpdateDACInfo,
    FindPolicyById,
    FindPolicyByFileId,
    UpdatePolicyById,
    GetAllPolicies,
    RejectAccessRequest,
    AcceptAccessRequest,
    CreateAccessRequest,
    RevokeUserPermissions,
    GetRequestsByStatus,
    GetRequestById,
    { provide: IInfoRepositoryToken, useClass: InfoRepository },
    { provide: IPoliciesRepositoryToken, useClass: PoliciesRepository },
    { provide: IRequestsRepositoryToken, useClass: RequestsRepository },
    { provide: configToken, useClass: ConfigModule },
  ],
  controllers: [
    InfoController,
    RequestsUserController,
    RequestsDacController,
    PoliciesUserController,
    PoliciesDacController
  ],
})
export class ControllersModule {}