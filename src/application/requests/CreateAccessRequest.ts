import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRequestsRepositoryToken, IRequestsRepository } from '../../domain/ports/repositories/requests/requests.interfaces';
import { configToken } from '../../infrastructure/config/env.config';
import { Request } from '../../domain/models/request';

@Injectable()
export class CreateAccessRequest {
  constructor(
    @Inject(IRequestsRepositoryToken) private readonly requestsRepository: IRequestsRepository,
    @Inject(configToken) private readonly configService: ConfigService,
  ) {}

  async run(id: string, content: any) {
    const request = Request.create(
      content.id,
      id,
      content.fileId,
      content.resource,
      content.comment,
      "Pending"
    );
    return this.requestsRepository.createAccessRequest(request.id.value, request);
  }
}
