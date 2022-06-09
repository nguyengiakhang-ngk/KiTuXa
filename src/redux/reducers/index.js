import { combineReducers } from "redux";
import areaReducer from "./area";
import userReducer from "./user";
import signUpReducer from "./signUp";
import freeServiceReducer from "./freeService";
import contractReducer from "./contract";
import billReducer from "./bill";

const reducers = combineReducers({
    area: areaReducer,
    user: userReducer,
    signUp: signUpReducer,
    freeService: freeServiceReducer,
    contract: contractReducer,
    bill: billReducer
});

export default ( state, action ) => reducers(state, action);
