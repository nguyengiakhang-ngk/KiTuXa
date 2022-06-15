import {addNotification, getNotification, updateNotification} from "../../api/notificationApi";


export const doAddNotification = (notification) => dispatch => {
    return new Promise((resolve, reject) => {
        addNotification(notification)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}

export const doGetNotification = (userId) => dispatch => {
    return new Promise((resolve, reject) => {
        getNotification(userId)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}

export const doUpdateNotification = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        updateNotification(id)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}
