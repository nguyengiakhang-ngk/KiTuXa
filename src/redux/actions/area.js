import { LOAD_LIST_AREA, LOAD_LIST_AREA_SUCCESS, LOAD_LIST_AREA_ERROR } from "./types";
import { getArea } from "../../api/areaAPI";

export const loadListArea = () => dispatch => {
    getArea()
        .then(response => response.json())
        .then(
            data => loadListAreaSuccess(data),
            error => loadListAreaError(error.message || 'Unexpected Error!!!')
        )
};

const loadListAreaSuccess = (listArea) => dispatch => {
    dispatch({
        type: LOAD_LIST_AREA_SUCCESS,
        listArea: listArea
    });
}

const loadListAreaError = (error) => dispatch => {
    dispatch({
        type: LOAD_LIST_AREA_ERROR,
        error: error
    });
}
