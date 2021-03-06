import axios from "axios"
import { url } from "../constant/define";

const path = url + "/material/"

const get = async () => {
    return await axios.get(path);
}
const getById = async (id) => {
    return await axios.get(path + id)
}

const getRoomAdmin = async () => {
    return await axios.get(url + "/getRoomAdmin");
}

const getDetailMaterialByStatus = async (id, status) => await axios.get(path + "detail-material/" + id + "/" + status);

const getDetailMaterialById = async (id) => await axios.get(path + "detail-material/view/" + id);

const statisticalByMaterialType = async (id) => await axios.get(path + "statistical/" + id);

const getAllDetailMaterial = async (room, material) => {
    return await axios.get(path + `detail-material/?room=${room}&material=${material}`)
}

const getDetailMaterial = async (id) => await axios.get(path + "detail-material/" + id);

const getStatus = async () => await axios.get(path + "status");

const getByIdLoaivatchat = async (idLoaivatchat) => await axios.get(path + "material-type/" + idLoaivatchat)

const add = async (material) => await axios.post(path, material)

const addDetailMaterial = async (detailMaterial) => await axios.post(path + "detail-material", detailMaterial);

const update = async (material) => await axios.patch(path, material);

const _delete = async (id) => await axios.delete(path + id)

export const materialAPI = {
    get,
    getById,
    getByIdLoaivatchat,
    statisticalByMaterialType,
    getAllDetailMaterial,
    getDetailMaterialByStatus,
    getRoomAdmin,
    getDetailMaterialById,
    getDetailMaterial,
    getStatus,
    add,
    addDetailMaterial,
    update,
    delete: _delete
}