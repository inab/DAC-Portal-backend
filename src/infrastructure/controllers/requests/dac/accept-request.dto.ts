import { IsString } from 'class-validator';

export class AcceptRequestDTO {
  @IsString()
  id: string;
  @IsString()
  accountId: string;
  @IsString()
  acl: string;
}
