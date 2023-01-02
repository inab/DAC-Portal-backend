import { IsString } from 'class-validator';

export class CreateRequestDTO {
  @IsString()
  id: string;
  @IsString()
  fileId: string;
  @IsString()
  resource: string;
  @IsString()
  comment: string;
}
