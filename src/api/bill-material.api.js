import axios from "axios"
import { url } from "../constant/define";
const path = url + "/bill-material/"

const getAllAdmin = async () => await axios.get(path);

const getById = async (id) => await axios.get(path + id);

const create = async (bill) => {
    return axios.post(path, bill)
}

const createDetailBill = async (detailBill) => {
    return axios.post(path + "detail-bill-material/", detailBill)
}

export const billMaterialAPI = {
    getAllAdmin,
    getById,
    create,
    createDetailBill
}
