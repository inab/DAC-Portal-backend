import { IsString } from 'class-validator';

export class UpdatePolicyDTO {
  @IsString()
  id: string;
  @IsString()
  fileId: string;
  @IsString()
  acl: string;
  @IsString()
  value: string;
}
