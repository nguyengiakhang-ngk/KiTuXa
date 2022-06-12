import {doPost, doGet} from './apiCommon'
import {LOGIN, SIGNUP, GET_USER_BY_BOOKTICKET, GET_USER_BY_ID} from '../constant/apiUrl'

export const login = (user) => {
    return doPost(LOGIN, user);
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
