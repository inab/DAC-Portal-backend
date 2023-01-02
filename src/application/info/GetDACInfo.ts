import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configToken } from '../../infrastructure/config/env.config';
import { IInfoRepository, IInfoRepositoryToken } from '../../domain/ports/repositories/info/info.interfaces';

@Injectable()
export class GetDACInfo {
  constructor(
    @Inject(IInfoRepositoryToken) private readonly dacRepository: IInfoRepository,
    @Inject(configToken) private readonly configService: ConfigService,
  ) {}

  async run(id: string) {
    return await this.dacRepository.getAllDacInfoByUserId(id);
  }
}