import axios from "axios";
import { ICompany } from "../components/company.components/company.interface";
import { baseUrl, headers } from "../shared/constants";

const resource = 'companies'
const url = `${baseUrl}/${resource}`;

async function getCompanies() {
    var response = await axios.get<ICompany[]>(`${url}/`);
    return response.data;
}

async function getCompanyById(id: number) {
    var response = await axios.get<ICompany>(`${url}/${id}`);
    return response.data;
}

async function postCompany(company: ICompany) {
    var response = await axios.post<ICompany>(`${url}/`, company, headers);
    return response.data;
}

async function putCompany(company: ICompany) {
    var response = await axios.put<ICompany>(`${url}/${company.id}`, company, headers);
    return response.data;
}

async function deleteCompany(id: number) {
    var response = await axios.delete<any>(`${url}/${id}`);
    return response.data;
}

export default { getCompanies, getCompanyById, postCompany, putCompany, deleteCompany };