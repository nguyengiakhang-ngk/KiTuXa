import {doGet} from './apiCommon'
import {GET_AREA} from '../constant/apiUrl'

export const getArea = async () => {
    return doGet(GET_AREA);
}
