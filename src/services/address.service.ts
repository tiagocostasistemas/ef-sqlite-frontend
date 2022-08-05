import axios from "axios";
import { baseUrl } from "../shared/constants";

const resource = 'address'
const url = `${baseUrl}/${resource}`;

async function getAddressByZipcode(zipcode: number) {
    var response = await axios.get<any>(`${url}/${zipcode}`);
    return response.data;
}

export default { getAddressByZipcode };