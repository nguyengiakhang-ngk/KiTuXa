
import {doGet, doPost, doPut, doDelete} from './apiCommon'
import {ADD_IMAGE_TYPE_ROOM} from '../constant/apiUrl'

// export const getListPaidService = async (userId) => {
//     return doGet(GET_LIST_PAID_SERVICE, userId);
// }

export const addImageTypeOfRoom = async (imageTypeOfRoom) => {
    return doPost(ADD_IMAGE_TYPE_ROOM, imageTypeOfRoom);
}

// export const updatePaidService = async (paidService, id) => {
//     return doPut(UPDATE_PAID_SERVICE, paidService, id);
// }
//
// export const deletePaidService = async (paidService) => {
//     return doDelete(DELETE_PAID_SERVICE, paidService);
// }
