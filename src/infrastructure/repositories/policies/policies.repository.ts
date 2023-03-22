import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dac } from '../../entities/dac.entity';
import { Policy } from '../../entities/policy.entity';
import { IPoliciesRepository } from '../../../domain/ports/repositories/policies/policies.interfaces';

@Injectable()
export class PoliciesRepository implements IPoliciesRepository {
  constructor(
    @InjectModel(Dac.name, 'dac-portal-api') private readonly dacModel: Model<Dac>,
    @InjectModel(Policy.name, 'dac-portal-api') private readonly policyModel: Model<Policy>,
    private readonly configService: ConfigService,
  ) {}

  private async getUserDacs(id: string): Promise<any> {
    const userDacs = await this.dacModel
      .find({ members: id })
      .select({ _id: 0, dacId: 1 })
      .lean();

    return userDacs.map((el) => el.dacId);
  }

  private queryByDacs(ids): any {
    return [
      { $match: { 'dacId': { $in: ids } } },
      {
        $lookup: {
          from: "policies",
          localField: "policies",
          foreignField: "_id",
          as: "policies"
        }
      },
      { $unwind: "$policies" },
      { $project: { 
          _id: 0,
          id: '$policies._id',
          dacId: '$dacId',
          fileId: '$policies.fileId', 
          acl: '$policies.acl', 
          value: '$policies.value' }
      }
    ]
  }


  private async updatePolicy(id: string, value: string): Promise<any> {
    await this.policyModel.findOneAndUpdate(
      { _id: id },
      { value: value },
      { new: true },
    );
    return id;
  }

  async getPolicy(id: string): Promise<any> {
    return await this.policyModel.find({ '_id': id })
  }

  async getPolicyByFile(id: string): Promise<any> {
    return await this.policyModel.find({ 'fileId': id })
  }

  async getAllPolicies(userId: string): Promise<any> {
    const dacs = await this.getUserDacs(userId);
    const response = await this.dacModel.aggregate(this.queryByDacs(dacs))
    return response;
  }

  async findPolicyById(id: string): Promise<any> {
    return await this.getPolicy(id);
  }

  async findPolicyByFileId(id: string): Promise<any> {
    return await this.getPolicyByFile(id);
  }

  async updatePolicyById(id: string, value: string): Promise<any> {
    return await this.updatePolicy(id, value);
  }
}
