import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRequestsRepository, IRequestsRepositoryToken } from '../../domain/ports/repositories/requests/requests.interfaces';
import { configToken } from '../../infrastructure/config/env.config';

@Injectable()
export class RevokeUserPermissions {
  constructor(
    @Inject(IRequestsRepositoryToken) private readonly requestsRepository: IRequestsRepository,
    @Inject(configToken) private readonly configService: ConfigService,
  ) {}

  async run(id: string, revokeUserPermissionsDTO: any) {
    return this.requestsRepository.revokeUserPermissions(id, revokeUserPermissionsDTO);
  }
}
