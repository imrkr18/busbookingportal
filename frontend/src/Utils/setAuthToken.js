  
import axios from "axios";
import {API} from "./config"
import { getItemFromLocalStorage } from "./Requests/LocalStorage";

const setAuthToken = token => {
  if (token) {
    const token = getItemFromLocalStorage('jwt')
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    // console.log(axios.defaults.headers)
  } else {
    console.log("I am going to delete the token")
    delete axios.defaults.headers.common["Authorization"];
  }
   axios.defaults.baseURL = API;
};

export default setAuthToken;