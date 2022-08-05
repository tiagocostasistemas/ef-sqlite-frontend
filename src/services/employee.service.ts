import axios from "axios";
import { IEmployee } from "../components/employee.components/employee.interface";
import { baseUrl, headers } from "../shared/constants";

const resource = 'employees'
const url = `${baseUrl}/${resource}`;

async function getEmployees() {
    var response = await axios.get<IEmployee[]>(`${url}/`);
    return response.data;
}

async function getEmployeeById(id: number) {
    var response = await axios.get<IEmployee>(`${url}/${id}`);
    return response.data;
}

async function postEmployee(employee: IEmployee) {
    console.log(url);
    console.log(employee);
    var response = await axios.post<IEmployee>(`${url}/`, employee, headers);
    return response.data;
}

async function putEmployee(employee: IEmployee) {
    console.log(employee);
    var response = await axios.put<IEmployee>(`${url}/${employee.id}`, employee, headers);
    return response.data;
}

async function deleteEmployee(id: number) {
    var response = await axios.delete<any>(`${url}/${id}`);
    return response.data;
}

export default { getEmployees, getEmployeeById, postEmployee, putEmployee, deleteEmployee };