import { Info } from "../../../../domain/models/info";

export interface IInfoRepository {
    getAllDacInfoByUserId: (id: string) => Promise<any[]>;
    updateDacInfo: (id: string, info: Info) => Promise<any>
}

export const IInfoRepositoryToken = Symbol("IInfoRepository");

/*
export abstract class IDacRepository<T> {
    abstract getAll(): Promise<T[]>;
  
    abstract get(id: string): Promise<T>;
  
    abstract create(item: T): Promise<T>;
  
    abstract update(id: string, item: T);
}
*/