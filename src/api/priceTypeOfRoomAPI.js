import {doGet, doPost, doPut, doDelete} from './apiCommon'
import {ADD_PRICE_SERVICE, ADD_PRICE_TYPE_OF_ROOM} from '../constant/apiUrl'

// export const getListTypeOfRoom = async (userId) => {
//     return doGet(GET_LIST_TYPE_OF_ROOM, userId);
// }

export const addPriceTypeOfRoom = async (priceTypeOfRoom) => {
    return doPost(ADD_PRICE_TYPE_OF_ROOM, priceTypeOfRoom);
}

export const addPriceService = async (priceService) => {
    return doPost(ADD_PRICE_SERVICE, priceService);
}

// export const updateTypeOfRoom = async (typeOfRoom, id) => {
//     return doPut(UPDATE_TYPE_OF_ROOM, typeOfRoom, id);
// }

// export const deleteTypeOfRoom = async (id) => {
//     return doDelete(DELETE_TYPE_OF_ROOM, id);
// }
