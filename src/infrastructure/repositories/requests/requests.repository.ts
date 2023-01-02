import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Dac } from '../../entities/dac.entity';
import { Request } from '../../entities/request.entity';
import { IRequestsRepository } from '../../../domain/ports/repositories/requests/requests.interfaces';
import { UserPermissions } from '../../../infrastructure/entities/permission.entity';
import { Policy } from '../../../domain/models/policy';

@Injectable()
export class RequestsRepository implements IRequestsRepository {
  constructor(
    @InjectModel(Dac.name, 'dac-portal-api')
    private readonly dacModel: Model<Dac>,
    @InjectModel(Request.name, 'dac-portal-api')
    private readonly requestModel: Model<Request>,
    @InjectModel(Policy.name, 'dac-portal-api')
    private readonly policyModel: Model<Policy>,
    @InjectModel(UserPermissions.name, 'permissions-api')
    private readonly permissionsModel: Model<UserPermissions>,
    @InjectConnection('dac-portal-api') private connection: Connection,
    private readonly configService: ConfigService,
  ) {}

  private async getUserDacs(id: string): Promise<any> {
    const userDacs = await this.dacModel
      .find({ members: id })
      .select({ _id: 0, dacId: 1 })
      .lean();
    return userDacs.map((el) => el.dacId);
  }

  private async getDacsByFileId(fileId: string): Promise<any> {
    const { acl } = await this.policyModel
      .findOne({ fileId: fileId })
      .select({ _id: 0, acl: 1 });
    return acl.split(':')[0];
  }

  private queryByDACandStatus(ids, status): any {
    return [
      { $match: { dacId: { $in: ids } } },
      {
        $lookup: {
          from: 'requests',
          localField: 'requests',
          foreignField: '_id',
          as: 'requests',
        },
      },
      { $unwind: '$requests' },
      { $match: { 'requests.status': status } },
      {
        $project: {
          _id: 0,
          id: '$requests._id',
          userId: '$requests.userId',
          fileId: '$requests.fileId',
          resource: '$requests.resource',
          comment: '$requests.comment',
          status: '$requests.status',
        },
      },
    ];
  }

  private async acceptRequestStatus(objectId, session): Promise<any> {
    let response = await this.requestModel.findByIdAndUpdate(
      { _id: objectId },
      { $set: { status: 'Accepted' } },
      { new: true, session },
    );
    return response;
  }

  private async createUserPermissions(id, resource, session): Promise<any> {
    const assertion = {
      type: 'ControlledAccessGrants',
      asserted: '1564814387',
      value: resource,
      source: 'https://test-url/source_dac',
      by: 'dac',
    };

    const user = await this.permissionsModel.updateOne(
      { sub: id },
      { $setOnInsert: { assertions: assertion } },
      { new: true, upsert: true, session },
    );

    let response = await this.permissionsModel.findOneAndUpdate(
      { sub: id, 'assertions.value': resource },
      { $set: { 'assertions.$': assertion } },
      { new: true, session },
    );

    if (!response) {
      const res = await this.permissionsModel.findOneAndUpdate(
        { sub: id },
        { $addToSet: { assertions: assertion } },
        { new: true, session },
      );

      response = await this.permissionsModel.findOne({
        sub: id,
        'assertions.$.value': resource,
      });
    }
    return response;
  }

  private async getRequestsQuery(
    dacIds: Array<string>,
    status: string,
  ): Promise<any> {
    return await this.dacModel.aggregate(
      this.queryByDACandStatus(dacIds, status),
    );
  }

  private async addRequestId(dacId, id, session): Promise<any> {
    let response = await this.dacModel.findOneAndUpdate(
      { dacId: dacId },
      { $push: { requests: id } },
      { new: true, session },
    );
    return response;
  }

  private async addRequest(request, session): Promise<any> {
    return await this.requestModel.create([request], { session });
  }

  async createAccessRequest(id: string, content: any): Promise<any> {
    const document = { ...content, _id: content.id.value, id: undefined };

    const dac = await this.getDacsByFileId(content.fileId);

    const session = await this.connection.startSession();

    let isCompleted = false;

    try {
      session.startTransaction();

      const firstResponse = await this.addRequestId(dac, id, session);

      if (firstResponse === null) throw new Error('RequestId addition failed');

      const secondResponse = await this.addRequest(document, session);

      if (secondResponse === null)
        throw new Error('Request collection addition failed');

      await session.commitTransaction();
    } catch (e) {
      console.log('error', e);
      await session.abortTransaction();
      return { response: false };
    } finally {
      session.transaction['state'] === 'TRANSACTION_COMMITTED'
        ? (isCompleted = true)
        : (isCompleted = false);
      await session.endSession();
      return { response: isCompleted };
    }
  }

  async getUserRequests(id: string): Promise<any> {
    return await this.requestModel.find({ userId: id }).lean();
  }

  async getAccessRequests(userId: string, status: string): Promise<any> {
    const dacs = await this.getUserDacs(userId);
    const requests = await this.getRequestsQuery(dacs, status);
    return requests;
  }

  async acceptAccessRequest(userId: string, requestObject: any): Promise<any> {
    const { id, accountId, acl } = requestObject;

    const session = await this.connection.startSession();

    let isCompleted = false;

    try {
      session.startTransaction();
      const firstResponse = await this.acceptRequestStatus(id, session);

      if (firstResponse === null) throw new Error('Status not updated');

      const secondResponse = await this.createUserPermissions(
        accountId,
        acl,
        session,
      );

      if (secondResponse === null) throw new Error('Permissions not updated');

      await session.commitTransaction();
    } catch (e) {
      console.log('error', e);
      await session.abortTransaction();
      return { response: false };
    } finally {
      session.transaction['state'] === 'TRANSACTION_COMMITTED'
        ? (isCompleted = true)
        : (isCompleted = false);
      await session.endSession();
      return { response: isCompleted };
    }
  }

  async revokeRequestStatus(id: string, acl: string, session): Promise<any> {
    return await this.requestModel.findOneAndUpdate(
      { userId: id, resource: acl },
      { $set: { status: 'Revoked' } },
      { new: true, session }      
    );
  }

  async removeUserPermissions(id: string, acl: any, session): Promise<any> {
    return await this.permissionsModel.findOneAndUpdate(
      { 'sub' : id, 'assertions.$.value' : acl },
      { $pull : { 'assertions' : { 'value': acl } } },
      { new: true, session }); 
  }

  async revokePermissions(requestObject: any): Promise<any> {
    const { accountId, acl } = requestObject;

    const session = await this.connection.startSession();

    let isCompleted = false;

    try {
      session.startTransaction();
      const firstResponse = await this.revokeRequestStatus(accountId, acl, session);

      if (firstResponse === null) throw new Error('Status not updated');

      const secondResponse = await this.removeUserPermissions(accountId, acl, session);

      if (secondResponse === null) throw new Error('Permissions not updated');

      await session.commitTransaction();
    } catch (e) {
      console.log('error', e);
      await session.abortTransaction();
      return { response: false };
    } finally {
      session.transaction['state'] === 'TRANSACTION_COMMITTED'
        ? (isCompleted = true)
        : (isCompleted = false);
      await session.endSession();
      return { response: isCompleted };
    }
  }

  async rejectAccessRequest(id: string): Promise<any> {
    return await this.requestModel.findByIdAndUpdate(
      { _id: id },
      { $set: { status: 'Denied' } },
      { new: true }
    )
  }

  async revokeUserPermissions(userId: string, requestObject: any): Promise<any> {
    return this.revokePermissions(requestObject)
  }
}