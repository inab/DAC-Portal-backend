import { SetMetadata } from '@nestjs/common';

export const HasResources = (...resources: any) => SetMetadata('resources', resources);