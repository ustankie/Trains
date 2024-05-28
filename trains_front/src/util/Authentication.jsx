import axios from "axios";
import {jwtDecode} from "jwt-decode";

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

export const isTokenExpired = () => {
    const token = getAuthToken();
    if (!token || token=="null" || token==null) {
        return true; 
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; 
    }
  };