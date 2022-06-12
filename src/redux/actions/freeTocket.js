import {} from "../../api/saveRoomApi";
import {addFreeTicket, deleteFreeTicket} from "../../api/freeTicketApi";

export const doAddFreeTicket = (freeTicket) => dispatch => {
    return new Promise((resolve, reject) => {
        addFreeTicket(freeTicket)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}

export const doDeleteAddFreeTicket = (typeOfRoomId) => dispatch => {
    return new Promise((resolve, reject) => {
        deleteFreeTicket(typeOfRoomId)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}
