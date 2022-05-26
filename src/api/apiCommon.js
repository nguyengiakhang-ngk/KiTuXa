import axios from "axios";



export const doGet = (url) => {
    // return (
    //     axios.get(url, {
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json;charset=UTF-8",
    //         },
    //     })
    // )
    return fetch(url, {
        method: 'GET'
    });
    // return new Promise((resolve,reject)=>{
    //     axios.get(url)
    //         .then(res =>{
    //             resolve(res.data)
    //         })
    //         .catch(reject)
    // })
}
