import http from "./httpservice";
import auth, { loginJWT } from "./authService";
const endPoint = `/users`

export async function register(username: string, password: string, email: string) {
    const res = await http.post(endPoint, {username, password, email});
    const jwt = res.headers["x-auth-token"];
    if (jwt) {
        loginJWT(jwt);
        return true;
    }
    return false;
}