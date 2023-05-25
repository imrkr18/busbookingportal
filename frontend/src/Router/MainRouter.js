import React from 'react'
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
// import SuperAdminRoute from "./SuperAdminRoute";
import Signin from "./../Components/Pages/Signin"
import Home from '../Components/Pages/Home';
import MyBookings from "../Components/Pages/Bookings";
import AllBookings from "../Components/Pages/Bookings/all";
import AddNewBus from '../Components/Pages/AddNewBus';
import EditBus from '../Components/Pages/AddNewBus/EditBus';
import BusAvailable from '../Components/Pages/BusAvailable';
import AllBusAvailable from '../Components/Pages/BusAvailable/all';
import BusUnAvailable from '../Components/Pages/BusUnavailable';
import AllBusUnAvailable from '../Components/Pages/BusUnavailable/all';
import Seats from '../Components/Pages/Seats';
import EditProfile from '../Components/Pages/Profile/edit';
import Owners from '../Components/Pages/People/Owners';
import Users from '../Components/Pages/People/Users';
import Guests from '../Components/Pages/People/Guests';
import Locations from '../Components/Pages/Locations';
import AddLocation from '../Components/Pages/Locations/add';
import AddOwner from '../Components/Pages/People/addOwner';
import EditLocation from '../Components/Pages/Locations/edit';
import Travels from '../Components/Pages/Travels';
import AddTravel from '../Components/Pages/Travels/add';
import EditTravel from '../Components/Pages/Travels/edit';



// const isAuth = ()=>{
//     return isAuthenticated();   
// }

const MainRouter = () => {
    return(
        <Routes>
            <Route path='/signin' exact element={<Signin/>}></Route>
            <Route path='/' exact element={<PrivateRoute element={<Home/>}></PrivateRoute>}></Route>
            <Route path='/my-bookings' exact element={<PrivateRoute element={<MyBookings/>}></PrivateRoute>}></Route>
            <Route path='/add-bus' exact element={<PrivateRoute element={<AddNewBus/>}></PrivateRoute>}></Route>
            <Route path='/edit-bus/:slug' exact element={<PrivateRoute element={<EditBus/>}></PrivateRoute>}></Route>
            <Route path='/bus-available' exact element={<PrivateRoute element={<BusAvailable/>}></PrivateRoute>}></Route>
            <Route path='/bus-unavailable' exact element={<PrivateRoute element={<BusUnAvailable/>}></PrivateRoute>}></Route>
            <Route path='/seat-details/:slug' exact element={<PrivateRoute element={<Seats/>}></PrivateRoute>}></Route>
            <Route path='/profile/edit' exact element={<PrivateRoute element={<EditProfile/>}></PrivateRoute>}></Route>
            
            
            
            
            {/* these are superadmin routes need to be updated */}
            <Route path='/all-bookings' exact element={<PrivateRoute element={<AllBookings/>}></PrivateRoute>}></Route>
            <Route path='/all-bus-available' exact element={<PrivateRoute element={<AllBusAvailable/>}></PrivateRoute>}></Route>
            <Route path='/all-bus-unavailable' exact element={<PrivateRoute element={<AllBusUnAvailable/>}></PrivateRoute>}></Route>
            <Route path='/people-owners' exact element={<PrivateRoute element={<Owners/>}></PrivateRoute>}></Route>
            <Route path='/people-users' exact element={<PrivateRoute element={<Users/>}></PrivateRoute>}></Route>
            <Route path='/people-guests' exact element={<PrivateRoute element={<Guests/>}></PrivateRoute>}></Route>
            <Route path='/locations' exact element={<PrivateRoute element={<Locations/>}></PrivateRoute>}></Route>
            <Route path='/add-location' exact element={<PrivateRoute element={<AddLocation/>}></PrivateRoute>}></Route>
            <Route path='/add-owner' exact element={<PrivateRoute element={<AddOwner/>}></PrivateRoute>}></Route>
            <Route path='/edit-locations/:slug' exact element={<PrivateRoute element={<EditLocation/>}></PrivateRoute>}></Route>
            <Route path='/travels' exact element={<PrivateRoute element={<Travels/>}></PrivateRoute>}></Route>
            <Route path='/add-travel' exact element={<PrivateRoute element={<AddTravel/>}></PrivateRoute>}></Route>
            <Route path='/edit-travel/:slug' exact element={<PrivateRoute element={<EditTravel/>}></PrivateRoute>}></Route>

            
        </Routes>
    );
}

export default MainRouter;