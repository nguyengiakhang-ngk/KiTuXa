<<<<<<< HEAD
import {doPost, doGet} from './apiCommon'
import {
    GET_ROOM_BY_AREA, 
    GET_ROOM_BY_ID, 
    GET_ROOM_BY_BOOKTICKET, 
    ADD_NUMBER_ELECTRIC, 
    ADD_NUMBER_WATER,
    ADD_ROOM, DELETE_ROOM, GET_LIST_ROOM, UPDATE_ROOM
} from '../constant/apiUrl'

export const getRoomByArea = (areaId) => {
    return doGet(GET_ROOM_BY_AREA, areaId);
}

export const getRoomById = (id) => {
    return doGet(GET_ROOM_BY_ID, id);
}

export const getRoomByBookTicket = (userId) => {
    return doGet(GET_ROOM_BY_BOOKTICKET, userId);
}

export const addNumberElectric = (number) => {
    console.log(number)
    return doPost(ADD_NUMBER_ELECTRIC, number);
}

export const addNumberWater = (number) => {
    return doPost(ADD_NUMBER_WATER, number);
}

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
