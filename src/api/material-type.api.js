import axios from "axios"
import { url } from "../constant/define"

const path = url + "/material-type/"

const get = async () => {
    return await axios.get(path)
}
const add = async (payload) => {
    return await axios.post(path, payload)
}

const update = async (materialType) => await axios.patch(path, materialType)

const _delete = async (id) => await axios.delete(path + id)

const getById = async (id) => await axios.get(path + id);

export const materialTypeAPI = {
    get,
    getById,
    add,
    update,
    delete: _delete,
}