import axios from "axios";
import { url } from "../constant/define";

export const doGet = (path, params = {}) => {
    let apiUrl = url + path;
    return new Promise((resolve, reject) => {
        axios
            .get(apiUrl, {params})
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
            .post(
                apiUrl,
                body
            )
            .then(function(response) {
                return resolve(response.data);
            })
            .catch(function(error) {
                return reject(error);
            });
    });
};

export const doPut = (path, body = {}, params = {}) => {
    let apiUrl = url + path;
    return new Promise((resolve, reject) => {
        axios
            .put(apiUrl, body, {params})
            .then(function(response) {
                return resolve(response.data);
            })
            .catch(function(error) {
                return reject(error);
            });
    });
};

export const doDelete = (path, params = {}) => {
    let apiUrl = url + path;
    return new Promise((resolve, reject) => {
        axios
            .delete(apiUrl,{params})
            .then(function(response) {
                return resolve(response.data);
            })
            .catch(function(error) {
                return reject(error);
            });
    });
};
