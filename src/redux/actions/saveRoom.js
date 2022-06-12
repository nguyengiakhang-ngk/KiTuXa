import {addSaveRoom, deleteSaveRoom, getSAveRoom} from "../../api/saveRoomApi";

export const doGetSaveRoom = (saveRoom) => dispatch => {
    return new Promise((resolve, reject) => {
        getSAveRoom(saveRoom)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}

export const doAddSaveRoom = (saveRoom) => dispatch => {
    return new Promise((resolve, reject) => {
        addSaveRoom(saveRoom)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}

export const doDeleteSaveRoom = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        deleteSaveRoom(id)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}
