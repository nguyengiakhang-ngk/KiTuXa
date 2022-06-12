import {doGet, doPost, doPut, doDelete} from './apiCommon'
import {ADD_TYPE_OF_ROOM, GET_LIST_TYPEOFROOM_BY_SAVEROOMTICKET, GET_PRICE_OF_ROOM} from '../constant/apiUrl'

// export const getListPaidService = async (userId) => {
//     return doGet(GET_LIST_PAID_SERVICE, userId);
// }

export const addTypeOfRoom = async (typeOfRoom) => {
    return doPost(ADD_TYPE_OF_ROOM, typeOfRoom);
}

export const getListTypeOfRoomBySaveRoomTicket = async (userId) => {
    return doGet(GET_LIST_TYPEOFROOM_BY_SAVEROOMTICKET, userId);
}

export const getPriceOfRoom = async (typeOfRoomId) => {
    return doGet(GET_PRICE_OF_ROOM, typeOfRoomId);
}

// export const updatePaidService = async (paidService, id) => {
//     return doPut(UPDATE_PAID_SERVICE, paidService, id);
// }
//
// export const deletePaidService = async (paidService) => {
//     return doDelete(DELETE_PAID_SERVICE, paidService);
// }
