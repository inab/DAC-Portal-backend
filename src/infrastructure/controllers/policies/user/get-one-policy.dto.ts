import { IsString } from 'class-validator';

export class GetOnePolicyDTO {
  @IsString()
  id: string;
}
