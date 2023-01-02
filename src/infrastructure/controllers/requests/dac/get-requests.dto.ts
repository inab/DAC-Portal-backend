import { IsString } from 'class-validator';

export class GetRequestsDTO {
  @IsString()
  status: string;
}
