import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) headers.append("Authorization", "Bearer " + accessToken);
    
    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };
    if (request) options.body = JSON.stringify(request);
    
    return fetch(options.url, options)
        .then((response) => {
            if (!response.ok) {
                return response.json().then((json) => Promise.reject(json));
            }
            return response;
        })
        .catch((error) => {
            console.log("Oops!");
            console.log(error.status);
            if (error.status === 403) {
                window.location.href = "/login";
            }
            return Promise.reject(error);
        });
}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            const token = response.token;
            if (token) {
                localStorage.setItem(ACCESS_TOKEN, token);
                return window.location.href = "/";
            }
        })
        .catch((error) => {
            console.log("Oops!");
            console.log(error.status);
            if (error.status === 403) {
                window.location.href = "/login";
            }
            return Promise.reject(error);
        });
}

export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO)
        .then((response) => response.json())
        .then((response) => {
            if (response.id) {
                window.location.href = "/";
            }
        })
        .catch((error) => {
            console.log("Oops!");
            console.log(error.status);
            if (error.status === 403) {
                window.location.href = "/auth/signup";
            }
            return Promise.reject(error);
        });
}

export function signout() {
    localStorage.setItem(ACCESS_TOKEN, null);
    window.location.href = "/";
}