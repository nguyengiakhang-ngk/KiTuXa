import {
    ADD_IMAGE_TYPE_OF_ROOM, ADD_IMAGE_TYPE_OF_ROOM_SUCCESS, ADD_IMAGE_TYPE_OF_ROOM_FAIL,
    DELETE_IMAGE_TYPE_OF_ROOM, DELETE_IMAGE_TYPE_OF_ROOM_SUCCESS, DELETE_IMAGE_TYPE_OF_ROOM_FAIL
} from "./types";
import {addImageTypeOfRoom, deleteImageTypeOfRoom} from "../../api/imageOfTypeRoomAIP";

// Load List Area
// const loadGetLArea = (dispatch) => {
//     dispatch({
//         type: LOAD_LIST_AREA
//     });
// }
//
// export const doGetListArea = (userId) => dispatch => {
//     loadGetLArea(dispatch);
//     return new Promise((resolve, reject) => {
//         getListArea(userId)
//             .then(data => {
//                 loadListAreaSuccess(dispatch, data);
//                 resolve(data);
//             })
//             .catch(error => {
//                 loadListAreaFail(dispatch, error);
//                 reject(error);
//             });
//     })
// }
//
// const loadListAreaSuccess = (dispatch, areaList) => {
//     dispatch({
//         type: LOAD_LIST_AREA_SUCCESS,
//         areaList: areaList
//     });
// }
//
// const loadListAreaFail = (dispatch, error) => {
//     dispatch({
//         type: LOAD_LIST_AREA_FAIL,
//         error: error
//     });
// }

// Add Image Of Type Room
export const doAddImageOfTypeRoom = (imageTypeOfRoom) => dispatch => {
    return new Promise((resolve, reject) => {
        addImageTypeOfRoom(imageTypeOfRoom)
            .then(data => {
                addImageOfTypeRoomSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                addImageOfTypeRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const addImageOfTypeRoomSuccess = (dispatch) => {
    dispatch({
        type: ADD_IMAGE_TYPE_OF_ROOM_SUCCESS
    });
}

const addImageOfTypeRoomFail = (dispatch, error) => {
    dispatch({
        type: ADD_IMAGE_TYPE_OF_ROOM_FAIL,
        error: error
    });
}

// Update Area
// export const doUpdateArea = (area, id) => dispatch => {
//     return new Promise((resolve, reject) => {
//         updateArea(area, id)
//             .then(data => {
//                 updateAreaSuccess(dispatch);
//                 resolve(data);
//             })
//             .catch(error => {
//                 updateAreaFail(dispatch, error);
//                 reject(error);
//             });
//     })
// }
//
// const updateAreaSuccess = (dispatch) => {
//     dispatch({
//         type: UPDATE_AREA_SUCCESS
//     });
// }
//
// const updateAreaFail = (dispatch, error) => {
//     dispatch({
//         type: UPDATE_AREA_FAIL,
//         error: error
//     });
// }

// Delete Add Image Of Type Room
export const doDeleteImageOfTypeRoom = (imageTypeOfRoom) => dispatch => {
    return new Promise((resolve, reject) => {
        deleteImageTypeOfRoom(imageTypeOfRoom)
            .then(data => {
                deleteDeleteImageOfTypeRoomSuccess(dispatch);
                resolve(data);
            })
            .catch(error => {
                deleteDeleteImageOfTypeRoomFail(dispatch, error);
                reject(error);
            });
    })
}

const deleteDeleteImageOfTypeRoomSuccess = (dispatch) => {
    dispatch({
        type: DELETE_IMAGE_TYPE_OF_ROOM_SUCCESS
    });
}

const deleteDeleteImageOfTypeRoomFail = (dispatch, error) => {
    dispatch({
        type: DELETE_IMAGE_TYPE_OF_ROOM_FAIL,
        error: error
    });
}
