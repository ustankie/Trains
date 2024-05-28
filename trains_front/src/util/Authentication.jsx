import axios from "axios";

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
};

export const getUserId = () => {
    return window.localStorage.getItem("user_id");
};



export const setAuthToken = (token, userId) => {
    window.localStorage.setItem("auth_token", token);
    window.localStorage.setItem("user_id", userId);

};

export const request = (method, url, data, params) => {
    let headers = {};
    try {
        let token = getAuthToken();
        if (token !== null && token != "null") {
            headers = { "Authorization": `Bearer ${token}` };
        }
    } catch (error) {
        console.log("No auth_token");
    }
    console.log(getAuthToken());

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data,
        params: params
    }).catch((error) => {
        console.log("authError");
        throw error;
    })
}