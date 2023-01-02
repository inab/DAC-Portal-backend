import { IsOptional, IsString } from 'class-validator';

export class UserDTO {
    @IsString()
    id: string;
    @IsString()
    @IsOptional()
    name: string;
    @IsString()
    @IsOptional()
    email: string;
    @IsOptional()
    roles: Array<string[]>;
    @IsOptional()
    memberships: Array<string[]>;
}
