import { LOAD_LIST_AREA, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR } from "./types";
import {getArea} from "../../api/areaAPI";

export const  areaRequest = () => dispatch => {
    getArea()
        .then(response => response.json())
        .then(
            data => dispatch({ type: LOAD_USERS_SUCCESS, data }),
            error => dispatch({ type: LOAD_USERS_ERROR, error: error.message || 'Unexpected Error!!!' })
        )
};
