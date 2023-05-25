import React from "react";
import { Route } from "react-router-dom";
import { isAuthenticated } from "../Utils/Requests/Auth";
import { useNavigate } from "react-router-dom";


const AdminRoute = ({ component: Component, ...rest }) => {
  
  const navigate = useNavigate();

  if( isAuthenticated() && 
     isAuthenticated().user.role==="superadmin")
  {
    return <Route {...rest} element={<Component/>}/>
  }
  else{
    navigate("/", {replace : true, state: {from : rest.location}});
    return null;
  }

}

export default AdminRoute;