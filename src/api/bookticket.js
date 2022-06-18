import {doPost, doGet, doPut, doDelete} from './apiCommon'
import {APPROVE_BOOKTICKET, ADD_BOOKTICKET, CHECKED_BOOK_TICKET} from '../constant/apiUrl'

export const approveBookTicket = (id) => {
    console.log(id,"<<<<<<<<")
    return doPut(APPROVE_BOOKTICKET, id);
}

export const addBookTicket = (bookticket) => {
    return doPost(ADD_BOOKTICKET, bookticket);
}

export const checkedBookTicketApi = (bookticket, id) => {
    return doPut(CHECKED_BOOK_TICKET, bookticket, id);
}

