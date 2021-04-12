import axios from 'axios';
import { toast } from "react-toastify";
import {APIEndpoint} from "../config.json";
//import logger from "./logservice";

axios.defaults.baseURL = APIEndpoint;

axios.interceptors.response.use(response => response, err => {
  const expectedError = err.response && err.response.status >= 400 && err.response.status < 500;
  if (!expectedError) {
    toast.error("Unexpected error has occured");
    //logger.log(err);
  }
  return Promise.reject(err);
})

function setJwt(jwt: string | null) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

  export default {
      get: axios.get,
      post: axios.post,
      put: axios.put,
      patch: axios.patch,
      delete: axios.delete,
      setJwt
  }