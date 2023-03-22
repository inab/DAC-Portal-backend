export interface IPoliciesRepository {
    getAllPolicies: (userId: string) => Promise<any>;
    findPolicyById: (id: string) => Promise<any>;
    findPolicyByFileId: (id: string) => Promise<any>; 
    updatePolicyById: (id: string, value: string) => Promise<any>;
}

export const IPoliciesRepositoryToken = Symbol("IPoliciesRepository");
