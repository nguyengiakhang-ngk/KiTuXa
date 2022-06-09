import {
    ADD_TYPE_OF_ROOM, ADD_TYPE_OF_ROOM_SUCCESS, ADD_TYPE_OF_ROOM_FAIL
} from "./types";
import {addTypeOfRoom} from "../../api/typeOfRoomAPI";

// Load List Paid Service
// const loadGetLPaidService = (dispatch) => {
//     dispatch({
//         type: LOAD_LIST_PAID_SERVICE
//     });
// }
//
// export const doGetListPaidService = (userId) => dispatch => {
//     loadGetLPaidService(dispatch);
//     return new Promise((resolve, reject) => {
//         getListPaidService(userId)
//             .then(data => {
//                 loadListPaidServiceSuccess(dispatch, data);
//                 resolve(data);
//             })
//             .catch(error => {
//                 loadListPaidServiceFail(dispatch, error);
//                 reject(error);
//             });
//     })
// }
//
// const loadListPaidServiceSuccess = (dispatch, paidServiceList) => {
//     dispatch({
//         type: LOAD_LIST_PAID_SERVICE_SUCCESS,
//         paidServiceList: paidServiceList
//     });
// }
//
// const loadListPaidServiceFail = (dispatch, error) => {
//     dispatch({
//         type: LOAD_LIST_PAID_SERVICE_FAIL,
//         error: error
//     });
// }

// Add Paid Service
export const doAddTypeOfRoom = (typeOfRoom) => dispatch => {
    return new Promise((resolve, reject) => {
        addTypeOfRoom(typeOfRoom)
            .then(data => {
                addTypeOfRoomSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                addTypeOfRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const addTypeOfRoomSuccess = (dispatch) => {
    dispatch({
        type: ADD_TYPE_OF_ROOM_SUCCESS
    });
}

const addTypeOfRoomFail = (dispatch, error) => {
    dispatch({
        type: ADD_TYPE_OF_ROOM_FAIL,
        error: error
    });
}

// Update Paid Service
// export const doUpdatePaidService = (paidService, id) => dispatch => {
//     return new Promise((resolve, reject) => {
//         updatePaidService(paidService, id)
//             .then(data => {
//                 updatePaidServiceSuccess(dispatch);
//                 resolve(data);
//             })
//             .catch(error => {
//                 updatePaidServiceFail(dispatch, error);
//                 reject(error);
//             });
//     })
// }
//
// const updatePaidServiceSuccess = (dispatch) => {
//     dispatch({
//         type: UPDATE_PAID_SERVICE_SUCCESS
//     });
// }
//
// const updatePaidServiceFail = (dispatch, error) => {
//     dispatch({
//         type: UPDATE_PAID_SERVICE_FAIL,
//         error: error
//     });
// }

// Delete Free Service
// export const doDeletePaidService = (paidService) => dispatch => {
//     return new Promise((resolve, reject) => {
//         deletePaidService(paidService)
//             .then(data => {
//                 deletePaidServiceSuccess(dispatch);
//                 resolve(data);
//             })
//             .catch(error => {
//                 deletePaidServiceFail(dispatch, error);
//                 reject(error);
//             });
//     })
// }
//
// const deletePaidServiceSuccess = (dispatch) => {
//     dispatch({
//         type: DELETE_PAID_SERVICE_SUCCESS
//     });
// }
//
// const deletePaidServiceFail = (dispatch, error) => {
//     dispatch({
//         type: DELETE_PAID_SERVICE_FAIL,
//         error: error
//     });
// }
