import axios from "axios"
import { url } from "../constant/define"

const path = url + "/upload-file/"

const removeImage = async (name, folder) => await axios.delete(path + folder + "/" + name)

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return await axios.post(path, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const editNameSave = (nameFile) => {
    const tmp = nameFile.split(".");
    const type = tmp[tmp.length - 1];
    const name = tmp.splice(0, tmp.length - 1).join(".");
    const time = Date.now();
    const nameSave = name + "-" + time + "." + type;
    return nameSave
}

export const uploadAPI = {
    uploadImage,
    removeImage
}