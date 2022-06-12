import {doPost, doGet, doPut, doDelete} from './apiCommon'
import {APPROVE_BOOKTICKET, ADD_BOOKTICKET} from '../constant/apiUrl'

export const approveBookTicket = (id) => {
    console.log(id,"<<<<<<<<")
    return doPut(APPROVE_BOOKTICKET, id);
}

export const addBookTicket = (bookticket) => {
    return doPost(ADD_BOOKTICKET, bookticket);
}
