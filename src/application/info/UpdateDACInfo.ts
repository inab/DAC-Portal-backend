import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configToken } from '../../infrastructure/config/env.config';
import { IInfoRepository, IInfoRepositoryToken } from '../../domain/ports/repositories/info/info.interfaces';
import { Info } from '../../domain/models/info';
import { DacInfoDTO } from '../../infrastructure/controllers/info/dac-info-dto';

@Injectable()
export class UpdateDACInfo {
  constructor(
    @Inject(IInfoRepositoryToken) private readonly dacRepository: IInfoRepository,
    @Inject(configToken) private readonly configService: ConfigService,
  ) {}

  async run(info: DacInfoDTO) {
    const dacInfo = Info.create(
      info.id,
      info.dacId,
      info.dacName,
      info.dacStudy,
      info.datasets,
      info.adminName,
      info.adminSurname,
      info.emailAddress,
      info.studyDescription,
      info.status
    );

    return await this.dacRepository.updateDacInfo(dacInfo.dacId, dacInfo);
  }
}