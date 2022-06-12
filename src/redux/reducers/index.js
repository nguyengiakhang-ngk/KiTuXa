import { combineReducers } from "redux";
import areaReducer from "./area";
import userReducer from "./user";
import signUpReducer from "./signUp";
import freeServiceReducer from "./freeService";
import paidSerViceReducer from  "./paidService";
import typeOfRoomReducer from  "./typeOfRoom";
import contractReducer from "./contract";
import billReducer from "./bill";
import roomReducer from "./room";
import receiptReducer from "./receipt";
import troubleReducer from "./trouble"

const reducers = combineReducers({
    area: areaReducer,
    user: userReducer,
    signUp: signUpReducer,
    freeService: freeServiceReducer,
    paidService: paidSerViceReducer,
    typeOfRoom: typeOfRoomReducer,
    contract: contractReducer,
    bill: billReducer,
    room: roomReducer,
    receipt: receiptReducer,
    trouble: troubleReducer
});

export default ( state, action ) => reducers(state, action);
