import {doGet, doPost, doPut, doDelete} from './apiCommon'
import {GET_LIST_AREA, ADD_AREA, UPDATE_AREA, DELETE_AREA, GET_AREA_BY_ID} from '../constant/apiUrl'

export const getListArea = async (userId) => {
    return doGet(GET_LIST_AREA, userId);
}

export const getAreaById = async (areaId) => {
    return doGet(GET_AREA_BY_ID, areaId);
}


export const addArea = async (area) => {
    return doPost(ADD_AREA, area);
}

export const updateArea = async (area, id) => {
    return doPut(UPDATE_AREA, area, id);
}

export const deleteArea = async (id) => {
    return doDelete(DELETE_AREA, id);
}
