import {addPaidTicket, deletePaidTicket} from "../../api/paidTicketApi";


export const doAddPaidTicket = (paidTicket) => dispatch => {
    return new Promise((resolve, reject) => {
        addPaidTicket(paidTicket)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}

export const doDeletePaidTicket = (typeOfRoomId) => dispatch => {
    return new Promise((resolve, reject) => {
        deletePaidTicket(typeOfRoomId)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}
