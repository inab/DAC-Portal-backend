import { Injectable } from '@nestjs/common';
import { AuthGuard } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakAuthGuard extends AuthGuard {}