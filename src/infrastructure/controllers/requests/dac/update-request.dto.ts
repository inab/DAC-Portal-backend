import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDTO } from '../user/create-request.dto';

export class UpdateRequestDTO extends PartialType(CreateRequestDTO) {}
