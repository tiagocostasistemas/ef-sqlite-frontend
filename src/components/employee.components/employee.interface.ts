import { IEntity } from "../../shared/entity.interface";

export interface IEmployee extends IEntity {
    name: string;
    position: number;
    salary: number;
    companyId: number,
    companyName: string
}