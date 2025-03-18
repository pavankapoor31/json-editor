import { BASE_URL } from "../config"
import axios from "axios"
export const generateJSON =async (message:string) => {
    const response = await axios.post(BASE_URL+'generateJson', { message });
    return response;
}