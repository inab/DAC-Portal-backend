import { IsString } from 'class-validator';

export class RevokeUserPermissionsDTO {
  @IsString()
  accountId: string;
  @IsString()
  acl: string;
}
