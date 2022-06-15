import {doGet, doPost, doPut, doDelete} from './apiCommon'
import {ADD_NOTIFICATION, GET_NOTIFICATION, UPDATE_NOTIFICATION} from '../constant/apiUrl'

export const addNotification = async (notification) => {
    return doPost(ADD_NOTIFICATION, notification);
}

export const getNotification = async (userId) => {
    return doGet(GET_NOTIFICATION, userId);
}

export const updateNotification = async (id) => {
    return doPut(UPDATE_NOTIFICATION, null, id);
}
