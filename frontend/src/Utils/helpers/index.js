// import jws from "jws";
import jwtDecode from "jwt-decode";
import {JWT_SECRET} from "../config"
import setAuthToken from "../setAuthToken";
import { KJUR, b64utoutf8 } from "jsrsasign";



export const checkIfTokenExpired =  (token=null) => {
    const dec = jwtDecode(token);
    if (Date.now() >= dec.exp * 1000) {
		console.log("new token generated")
      const payload = {
        _id: dec._id,
        name: dec.name,
        email: dec.email,
        role: dec.role,
        refresh_hash: dec.salt,
        avatar: dec.avatar || null
      };

      try{
        const header = { alg: "HS256", typ: "JWT" };
        const signedToken = KJUR.jws.JWS.sign("HS256", JSON.stringify(header), JSON.stringify(payload), JWT_SECRET);
    
        token = signedToken;
      }
      catch(error){
        console.log(error);
      }

    }
    setAuthToken(token);
    return token;
}

export const defaultAdminImage = "https://www.lansweeper.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN.png"