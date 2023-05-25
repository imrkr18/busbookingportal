import React, { useEffect } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Utils/Requests/Auth";
import { checkIfTokenExpired } from "../Utils/helpers";
// import { useNavigate } from "react-router-dom";


const PrivateRoute = ({ element: Component, ...rest }) => {

  // const navigate = useNavigate();

  // useEffect(()=>{
  //   const isTokenExpired = () =>{
  //     const authData = isAuthenticated();
  //     console.log(authData)
  //     if(authData){
  //       const { token } = authData;
  //       const tokenExpired = checkIfTokenExpired(token);
  //       console.log(token, tokenExpired)
  //       if(tokenExpired){
  //         navigate("/signin");
  //       }
  //     }
  //     else{
  //       navigate("/signin");
  //     }
  //   }
  //   isTokenExpired();
    
  // },[navigate])

  const isAuthenticatedUser = isAuthenticated();
  
  if(!isAuthenticatedUser){
    return <Navigate to="/signin" replace />
  }
  return Component;
  
  
};


// const PrivateRoute = ({component : Component, ...rest}) =>{
//   const navigate = useNavigate();
  
//   if(isAuthenticated()){
//     return <Route {...rest} element={<Component/>} />;
//   }
//   else{
//     navigate("/signin", {replace : true, state: {from: rest.location}});
//     return null;
//   }
// };

export default PrivateRoute ;