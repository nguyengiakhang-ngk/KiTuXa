import {doPost, doGet} from './apiCommon'
import {LOGIN, SIGNUP, GET_USER_BY_BOOKTICKET} from '../constant/apiUrl'

export const login = (user) => {
    return doPost(LOGIN, user);
}

export const signUp = async (user) => {
    return doPost(SIGNUP, user);
}

export const getUserByBookTicket = (roomId) => {
    return doGet(GET_USER_BY_BOOKTICKET, roomId);
}
