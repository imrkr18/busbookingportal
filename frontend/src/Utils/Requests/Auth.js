import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../setAuthToken";
import { JWT_SECRET, jwtKey, API_URL } from "../config";
import {
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
  setItemToLocalStorage
} from "./LocalStorage";
import { checkIfTokenExpired } from "../helpers";

const token = localStorage.getItem('jwt');
axios.defaults.headers.common['authorization'] = `Bearer ${token}`;


export const signUp = user => axios.post(`${API_URL}/auth-owner/signup`, user);

export const signIn = user => axios.post(`${API_URL}/auth-owner/signin`, user);

export const refreshToken = id =>
  axios.post("/auth-owner/refreshToken", { _id: id });

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    
    setItemToLocalStorage(jwtKey, JSON.stringify(data.data));
    setAuthToken(isAuthenticated().token);
    next();
  }
};


export const isAuthenticated =  () => {
  if (typeof window === "undefined") {
    return false;
  }

  let jsontoken = getItemFromLocalStorage(jwtKey);
  let data;
  
  if (jsontoken) {
    let { token } = JSON.parse(jsontoken);
    
    // const tokenValid = checkIfTokenExpired(jsontoken);

    try {
      // const isValid = KJUR.jws.JWS.verify(token, JWT_SECRET);
      // console.log(`is it valid ${isValid}}`)
      // if (1) {
        const payload = jwtDecode(token)//KJUR.jws.JWS.readSafeJSONString(b64utoutf8(token.split(".")[1]));
        data = { token, user: { ...payload } };
      // } 
      // else {
      //   data = false;
      //   signout();
      // }
    } catch (error) {
      if (error.expiredAt !== undefined) {
        token = checkIfTokenExpired(token);
        data = { token, user: { ...jwtDecode(token) } };
      } else {
        data = false;
        signout();
      }
    }

    setItemToLocalStorage(jwtKey, JSON.stringify({ token }));
    return data;
  } else {
    return false;
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    removeItemFromLocalStorage(jwtKey);
    return true;
  }
};
