import { IEntity } from "../../shared/entity.interface";

export interface ICompany extends IEntity {
    name: string;
    street: string;
    number: number;
    complement: string;
    district: string;
    city: string;
    state: string;
    zipcode: number;
    phone: string
}
  