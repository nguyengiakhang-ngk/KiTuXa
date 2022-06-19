import {doPost, doGet, doPut, doDelete} from './apiCommon'
import {
    LOGIN,
    SIGNUP,
    GET_USER_BY_BOOKTICKET,
    GET_USER_BY_ID, GET_USER,
    UPDATE_USER, CHECK_DUPLICATE, CHANGE_PASS
} from '../constant/apiUrl';

export const login = (user) => {
    return doPost(LOGIN, user);
}

export const changePass = (pass, numberPhone) => {
    return doPut(CHANGE_PASS, pass, numberPhone);
}

export const signUp = async (user) => {
    return doPost(SIGNUP, user);
}

export const getUserByBookTicket = (roomId) => {
    return doGet(GET_USER_BY_BOOKTICKET, roomId);
}

export const getUserById = (userId) => {
    return doGet(GET_USER_BY_ID, userId);
}

export const updateUser = async (user, id) => {
    return doPut(UPDATE_USER, user, id);
}

export const checkUserDuplicate = (numberPhone) => {
    return doGet(CHECK_DUPLICATE, numberPhone);
}
