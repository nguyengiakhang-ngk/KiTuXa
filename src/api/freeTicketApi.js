import {doPost, doDelete} from './apiCommon'
import {ADD_FREE_TICKET, DELETE_ADD_FREE_TICKET} from '../constant/apiUrl'


export const addFreeTicket = async (freeTicket) => {
    return doPost(ADD_FREE_TICKET, freeTicket);
}

export const deleteFreeTicket = async (typeOfRoomId) => {
    return doDelete(DELETE_ADD_FREE_TICKET, typeOfRoomId);
}
