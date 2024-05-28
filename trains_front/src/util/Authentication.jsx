import axios from "axios";

export const getAuthToken=()=>{
    return window.localStorage.getItem("auth_token");
};


export const setAuthToken=(token)=>{
    window.localStorage.setItem("auth_token",token);
};

export const request=(method, url,data)=>{
    let headers={};
    try{let token=getAuthToken();
        if (token!==null && token!="null"){
            headers={"Authorization":`Bearer ${token}`};
        }
    }catch(error){
        console.log("No auth_token");
    }

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    }).catch((error)=>{console.log("autherror"); throw error;})
}