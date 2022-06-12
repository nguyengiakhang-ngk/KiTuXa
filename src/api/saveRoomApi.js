import {doGet, doPost, doPut, doDelete} from './apiCommon'
import {ADD_SAVE, DELETE_SAVE, GET_SAVE_ROOM} from '../constant/apiUrl'

export const getSAveRoom = async (saveRoom) => {
    return doGet(GET_SAVE_ROOM, saveRoom);
}

export const addSaveRoom = async (saveRoom) => {
    return doPost(ADD_SAVE, saveRoom);
}

export const deleteSaveRoom = async (id) => {
    return doDelete(DELETE_SAVE, id);
}
