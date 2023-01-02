export interface IRequestsRepository {
  createAccessRequest: (id: string, content: any) => Promise<any>;
  getUserRequests: (id: string) => Promise<any>;
  getAccessRequests: (userId: string, status: string) => Promise<any>;
  acceptAccessRequest: (id: string, dto: any) => Promise<any>;
  rejectAccessRequest: (id: string) => Promise<any>;
  revokeUserPermissions: (id: string, dto: any) => Promise<any>;
}

export const IRequestsRepositoryToken = Symbol("IRequestsRepository");
