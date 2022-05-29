import axios from "axios";
import { url } from "../constant/define";

export const doGet = (path, params = {}) => {
    let apiUrl = url + path;
    return new Promise((resolve, reject) => {
        axios
            .get(apiUrl, {
                params: params
            })
            .then(function(response) {
                return resolve(response.data);
            })
            .catch(function(error) {
                return reject(error);
            });
    });
};

export const doPost = (path, body) => {
    let apiUrl = url + path;
    return new Promise((resolve, reject) => {
        axios
            .post(apiUrl, body)
            .then(function(response) {
                return resolve(response.data);
            })
            .catch(function(error) {
                return reject(error);
            });
    });
};
