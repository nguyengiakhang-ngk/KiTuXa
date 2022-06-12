import {doGet, doPost, doPut, doDelete} from './apiCommon'
import {
    GET_LIST_TROUBLE_BY_ROOM,
    GET_TROUBLE_BY_ID,
    ADD_TROUBLE,
    UPDATE_TROUBLE,
    DELETE_TROUBLE
} from '../constant/apiUrl'

export const getListTroubleByRoom = async (roomId) => {
    return doGet(GET_LIST_TROUBLE_BY_ROOM, roomId);
}

export const getTroubleById = async (id) => {
    return doGet(GET_TROUBLE_BY_ID, id);
}


export const addTrouble = async (trouble) => {
    return doPost(ADD_TROUBLE, trouble);
}

export const updateTrouble = async (trouble, id) => {
    return doPut(UPDATE_TROUBLE, trouble, id);
}

export const deleteTrouble = async (id) => {
    return doDelete(DELETE_TROUBLE, id);
}


