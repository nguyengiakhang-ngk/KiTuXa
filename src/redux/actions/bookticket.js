import { 
    APPROVE_BOOKTICKET,
    APPROVE_BOOKTICKET_SUCCESS,
    APPROVE_BOOKTICKET_FAIL,
    ADD_BOOKTICKET,
    ADD_BOOKTICKET_SUCCESS,
    ADD_BOOKTICKET_FAIL
 } from "./types";
import { 
    approveBookTicket, addBookTicket
} from "../../api/bookticket";


export const doApproveBookTicket = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        console.log(">>>Approve>>", id)
        approveBookTicket(id)
            .then(data => {
                approveBookTicketSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                approveBookTicketError(dispatch, error);
                reject(error);
            });
    })
};

export const doAddBookTicket = (bookticket) => dispatch => {
    return new Promise((resolve, reject) => {
        addBookTicket(bookticket)
            .then(data => {
                addBookTicketSuccess(dispatch, data);
                resolve(data);
            })
            .catch(error => {
                addBookTicketError(dispatch, error);
                reject(error);
            });
    })
};

const addBookTicketSuccess = (dispatch) => {
    dispatch({
        type: ADD_BOOKTICKET_SUCCESS
    });
}

const addBookTicketError = (dispatch, error) => {
    dispatch({
        type: ADD_BOOKTICKET_FAIL,
        error: error
    });
}

const approveBookTicketSuccess = (dispatch) => {
    dispatch({
        type: APPROVE_BOOKTICKET_SUCCESS
    });
}

const approveBookTicketError = (dispatch, error) => {
    dispatch({
        type: APPROVE_BOOKTICKET_FAIL,
        error: error
    });
}
