import { IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class DacInfoDTO {
  @IsString()
  id: string;
  @IsString()
  dacId: string;
  @IsString()
  dacName: string;
  @IsString()
  dacStudy: string;
  @IsString()
  datasets: string;
  @IsString()
  adminName: string;
  @IsString()
  adminSurname: string;
  @IsString()
  emailAddress: string;
  @IsString()
  studyDescription: string;
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  status: boolean;
}
