import { IsString } from 'class-validator';

export class RejectRequestDTO {
  @IsString()
  id: string;
}
