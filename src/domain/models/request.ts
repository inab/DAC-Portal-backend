import { UUID } from '../value-objects/uuid';

export class Request {
  readonly id: UUID;
  readonly userId: string;
  readonly fileId: string;
  readonly resource: string;
  readonly comment: string;
  readonly status: string;

  private constructor(
    id: UUID,
    userId: string,
    fileId: string,
    resource: string,
    comment: string,
    status: string 
  ) {
    this.id = id;
    this.userId = userId;
    this.fileId = fileId;
    this.resource = resource;
    this.comment = comment;
    this.status = status;
  }
  
  static create(
    id: string,
    userId: string,
    fileId: string,
    resource: string,
    comment: string,
    status: string
  ): Request {
    const policy = new Request(
      new UUID(id), 
      userId,
      fileId, 
      resource,
      comment,
      status
    );
    return policy;
  }
}