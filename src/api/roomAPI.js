import {doGet, doPost, doPut, doDelete} from './apiCommon'
import {ADD_ROOM, DELETE_ROOM, GET_LIST_ROOM, UPDATE_ROOM} from '../constant/apiUrl'

export const getListRoom = async (userId) => {
    return doGet(GET_LIST_ROOM, userId);
}

export const addRoom = async (Room) => {
    return doPost(ADD_ROOM, Room);
}

export const updateRoom = async (room, id) => {
    return doPut(UPDATE_ROOM, room, id);
}

export const deleteRoom = async (id) => {
    return doDelete(DELETE_ROOM, id);
}
