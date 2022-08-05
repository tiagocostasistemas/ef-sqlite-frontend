import { ICompany } from "../components/company.components/company.interface";
import { IEmployee } from "../components/employee.components/employee.interface";

export const baseUrl = 'http://localhost:5212/v1';

export const initCompany: ICompany = {
  name: "",
  street: "",
  number: 0,
  complement: "",
  district: "",
  city: "",
  state: "",
  zipcode: 0,
  phone: ""
};

export const initEmployee: IEmployee = {
  name: "",
  position: 0,
  salary: 0,
  companyId: 0,
  companyName: ""
};

export const headers = {
  headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
  },
}

export default { baseUrl, initCompany, initEmployee, headers };
