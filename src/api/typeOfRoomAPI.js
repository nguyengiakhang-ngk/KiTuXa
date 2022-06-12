import {doGet, doPost, doPut, doDelete} from './apiCommon'
import {
    ADD_TYPE_OF_ROOM,
    DELETE_TYPE_OF_ROOM,
    GET_LIST_TYPE_OF_ROOM,
    GET_LIST_TYPE_OF_ROOM_NEW, GET_LIST_TYPE_OF_ROOM_SEARCH, GET_LIST_TYPE_OF_ROOM_SEARCH_ADDRESS,
    UPDATE_TYPE_OF_ROOM
} from '../constant/apiUrl'

export const getListTypeOfRoom = async (userId) => {
    return doGet(GET_LIST_TYPE_OF_ROOM, userId);
}

export const getListTypeOfRoomNew = async () => {
    return doGet(GET_LIST_TYPE_OF_ROOM_NEW, null);
}

export const getListTypeOfRoomSearch = async (key) => {
    return doGet(GET_LIST_TYPE_OF_ROOM_SEARCH, key);
}
export const getListTypeOfRoomSearchAddress = async (key) => {
    return doGet(GET_LIST_TYPE_OF_ROOM_SEARCH_ADDRESS, key);
}

export const addTypeOfRoom = async (typeOfRoom) => {
    return doPost(ADD_TYPE_OF_ROOM, typeOfRoom);
}

export const updateTypeOfRoom = async (typeOfRoom, id) => {
    return doPut(UPDATE_TYPE_OF_ROOM, typeOfRoom, id);
}

export const deleteTypeOfRoom = async (id) => {
    return doDelete(DELETE_TYPE_OF_ROOM, id);
}
