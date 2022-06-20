import axios from "axios"
import { url } from "../constant/define"
const path = url + "/event-material/"

export const get = async () => {
    return await axios.get(path)
}

export const getOne = async (id) => {
    return await axios.get(path + id)
}

export const create = async (event) => {
    return await axios.post(path, event)
}

export const eventMaterialAPI = {
    get,
    getOne,
    create
}