import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dac } from '../../entities/dac.entity';
import { IInfoRepository } from '../../../domain/ports/repositories/info/info.interfaces';
import { DacInfoDTO } from 'src/infrastructure/controllers/info/dac-info-dto';

@Injectable()
export class InfoRepository implements IInfoRepository {
  constructor(
    @InjectModel(Dac.name, 'dac-portal-api') private readonly dacModel: Model<Dac>,
    private readonly configService: ConfigService,
  ) {}

  private getAllDacInfoQuery = (id: string) => {
    return [
      { $match: { members: id } },
      { $unwind: '$info' },
      {
        $project: {
          _id: 0,
          id: '$info._id',
          dacId: '$dacId',
          dacName: '$info.dacName',
          dacStudy: '$info.dacStudy',
          datasets: '$info.datasets',
          adminName: '$info.adminName',
          adminSurname: '$info.adminSurname',
          emailAddress: '$info.emailAddress',
          studyDescription: '$info.studyDescription',
          status: '$info.status',
        },
      },
    ];
  };

  private async getAllDacInfo(userId: string): Promise<DacInfoDTO[]> {
    return await this.dacModel.aggregate(this.getAllDacInfoQuery(userId));
  }

  private async getDacInfo(id: string): Promise<any> {
    const response = await this.dacModel
      .findOne({ dacId: id })
      .select({ dacId: 0, members: 0, policies: 0 })
      .lean();
    return response.info;
  }

  private async updateInfo(id: string, info: any): Promise<any[]> {
    const document = { ...info, _id: info.id.value, id: undefined };
    await this.dacModel.findOneAndUpdate(
      { dacId: id },
      { info: document },
      { new: true },
    );
    const response = await this.getDacInfo(id);
    return response._id;
  }

  async getAllDacInfoByUserId(userId: string) {
    return await this.getAllDacInfo(userId);
  }

  async updateDacInfo(id: string, info: any) {
    return await this.updateInfo(id, info);
  }
}
