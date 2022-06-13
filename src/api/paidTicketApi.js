import {doPost, doDelete} from './apiCommon'
import {ADD_PAID_TICKET, DELETE_PAID_TICKET} from '../constant/apiUrl'


export const addPaidTicket = async (paidTicket) => {
    return doPost(ADD_PAID_TICKET, paidTicket);
}

export const deletePaidTicket = async (typeOfRoomId) => {
    return doDelete(DELETE_PAID_TICKET, typeOfRoomId);
}
