import http from "./httpservice";
import jwtDecode from "jwt-decode";
const endPoint = `/auth`
const jwtKey = "JWT_TOKEN";

http.setJwt(getJWT());

export async function login(username: string, password: string) {
    const {data: jwt} = await http.post(endPoint, {username, password});
    saveJWT(jwt);
}

export async function loginJWT(jwt: string) {
    saveJWT(jwt);
}

export function getCurrentUser () {
    try {
        const jwt = getJWT();
        return jwtDecode(jwt as string);
        
    } catch (error) {return null}
}

export function logout() {
    localStorage.removeItem(jwtKey);
}

export function saveJWT(jwt: string) {
    localStorage.setItem(jwtKey, jwt);
}

export function getJWT() {
    return localStorage.getItem(jwtKey);
}

export default {
    login, logout, getCurrentUser, loginJWT
}