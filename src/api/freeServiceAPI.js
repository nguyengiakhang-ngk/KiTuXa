import {doGet, doPost, doPut, doDelete} from './apiCommon'
import {GET_LIST_FREE_SERVICE, ADD_FREE_SERVICE, UPDATE_FREE_SERVICE, DELETE_FREE_SERVICE} from '../constant/apiUrl'

export const getListFreeService = async (userId) => {
    return doGet(GET_LIST_FREE_SERVICE, userId);
}

export const addFreeService = async (freeService) => {
    return doPost(ADD_FREE_SERVICE, freeService);
}

export const updateFreeService = async (freeService, id) => {
    return doPut(UPDATE_FREE_SERVICE, freeService, id);
}

export const deleteFreeService = async (freeService) => {
    return doDelete(DELETE_FREE_SERVICE, freeService);
}
