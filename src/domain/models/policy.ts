import { UUID } from '../value-objects/uuid';

export class Policy {
  readonly id: UUID;
  readonly fileId: string;
  readonly acl: string;
  readonly value: string;

  private constructor(
    id: UUID,
    value: string,
    fileId: string,
    acl: string 
  ) {
    this.id = id;
    this.value = value;
    this.fileId = fileId;
    this.acl = acl;
  }
  
  static create(
    id: string,
    value: string,
    fileId?: string,
    acl?: string
  ): Policy {
    const policy = new Policy(
      new UUID(id), 
      value,
      fileId, 
      acl
    );
    return policy;
  }
}