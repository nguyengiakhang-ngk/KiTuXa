import axios from "axios"
import { url } from "../constant/define"
const path = url + "/trouble-material/"

export const get = async () => {
    return await axios.get(path)
}

export const getType = async () => {
    return await axios.get(url + "/type-trouble-material/")
}

export const getOne = async (id) => {
    return await axios.get(path + id)
}

export const create = async (trouble) => {
    return await axios.post(path, trouble)
}

export const troubleMaterialAPI = {
    get,
    getOne,
    getType,
    create
}