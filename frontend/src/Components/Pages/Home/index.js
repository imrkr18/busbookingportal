
import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
import Layout from '../../Core/Layout';
import {
  getAllAvailableBuses,
  getAllUnavailableBuses,
} from '../../../Utils/Requests/Bus';
import { getOwners, getGuests, getUsers } from '../../../Utils/Requests/People';
import { isAuthenticated } from '../../../Utils/Requests/Auth';
import "./home.css";
import {
    getAllLocations,
  } from "../../../Utils/Requests/Location";
import { getAllTravels } from "../../../Utils/Requests/Travel";

const Home = () => {
  const [totalBus, setTotalBus] = useState();
  const [totalPeople, setTotalPeople] = useState();
  const [travels, setTravels] = useState();
  const [location, setLocation] = useState();
  const [user, setUser] = useState({ role: 'owner' });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = isAuthenticated();
        setUser(user);

        await fetchAllBusData();
        await fetchAllPeopleData();
        await fetchAllTravels();
        await fetchAllLocation();
      } catch (error) {
        console.log('Authentication Failed, please try again');
      }
    };

    fetchData();
  }, []);

  const fetchAllBusData = async () => {
    let availableCount = 0;
    let unavailableCount = 0;

    const available = await getAllAvailableBuses();
    if (available && available.status === 200) {
      availableCount = available.data.length;
    }

    const unavailable = await getAllUnavailableBuses();
    if (unavailable && unavailable.status === 200) {
      unavailableCount = unavailable.data.length;
    }

    setTotalBus(available.data.length);
        //     {
        //   labels: ['Available', 'Unavailable'],
        //   datasets: [
        //     {
        //       data: [availableCount, unavailableCount],
        //       backgroundColor: ['#36A2EB', '#FFCE56'],
        //       hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
        //     },
        //   ],
        // }
  };

  const fetchAllPeopleData = async () => {
    let guestsCount = 0;
    let usersCount = 0;
    let ownersCount = 0;

    const owners = await getOwners();
    if (owners && owners.status === 200) {
      ownersCount = owners.data.length;
    }

    const guests = await getGuests();
    if (guests && guests.status === 200) {
      guestsCount = guests.data.length;
    }

    const users = await getUsers();
    if (users && users.status === 200) {
      usersCount = users.data.length;
    }

    setTotalPeople(owners.data.length + guests.data.length + users.data.length);
    // {
    //     labels: ['Owners', 'Users', 'Guests'],
    //     datasets: [
    //       {
    //         data: [ownersCount, usersCount, guestsCount],
    //         backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
    //         hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
    //       },
    //     ],
    //   }
  };

  const fetchAllTravels = async () => {

    const available = await getAllTravels();
    if (available && available.status === 200) {
      const allTravels = available.data.length;
    }

    setTravels(available.data.length);
    // {
    //     labels: ['Available', 'Unavailable'],
    //     datasets: [
    //       {
    //         data: [availableCount, unavailableCount],
    //         backgroundColor: ['#36A2EB', '#FFCE56'],
    //         hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
    //       },
    //     ],
    //   }
  };

  const fetchAllLocation = async () => {
    let allLocation;

    const response = await getAllLocations();
    if (response && response.status === 200) {
    //   for (let i = 0; i < response.data.length; i++) {
    //     const booking = response.data[i];
    //     if (booking.verification === 'verified') {
    //       verifiedCount++;
    //     } else if (booking.verification === 'notverified') {
    //       unverifiedCount++;
    //     } else if (booking.verification === 'payed') {
    //       payedCount++;
    //     }
    //   }

    allLocation = response.data.length;
    }

    setLocation(allLocation);
    // {
    //     labels: ['Verified', 'Unverified', 'Payed'],
    //     datasets: [
    //       {
    //         data: [verifiedCount, unverifiedCount, payedCount],
    //         backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
    //         hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
    //       },
    //     ],
    //   }
  };

//   const handleRedirect = (url) => {
//     navigate(url);
//   };

  console.log('total bus:', totalBus);
  console.log('total people:', totalPeople);
  console.log('my bus:', travels);
  console.log('my bookings:', location);

  return (
    <Layout>
    <div class="container">
    <div class="row">
        <div class="col-md-6">
        <div class="square-box">
            <h3>Total Available Buses</h3>
            <div class="data">
            <p>{totalBus}</p>
            </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="square-box">
            <h3>Users Count</h3>
            <div class="data">
            <p>{totalPeople}</p>

            </div>
        </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
        <div class="square-box">
            <h3>No. Travels Available</h3>
            <div class="data">
            <p>{travels}</p>

            </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="square-box">
            <h3>No. of Location available</h3>
            <div class="data">
            <p>{location}</p>

            </div>
        </div>
        </div>
    </div>
    </div>

    </Layout>
  );
};

export default Home;






// import React from "react";
// import { Pie } from "react-chartjs-2";
// import Layout from "../../Core/Layout";
// import {
//   getAllAvailableBuses,
//   getAllUnavailableBuses,
//   getAvailableBusesOfOwner,
//   getUnavailableBusesOfOwner,
// } from "../../../Utils/Requests/Bus";
// import { getOwners, getGuests, getUsers } from "../../../Utils/Requests/People";
// import { isAuthenticated } from "../../../Utils/Requests/Auth";
// import { getOwnerBookings } from "../../../Utils/Requests/Booking";
// import { useNavigate } from "react-router-dom";

// class Home extends React.Component {
//   state = {
//     totalBus: {},
//     totalPeople: {},
//     myBus: {},
//     myBookings: {},
//     user: { role: "owner" },
//   };

//   componentDidMount() {
//     try {
//       const user = isAuthenticated();
//       this.setState({ user });
//       this.fetchAllBusData();
//       this.fetchAllPeopleData();
//       this.fetchMyBusData();
//       this.fetchBookingData();
//     } catch (error) {
//       // Handle error if authentication fails
//       console.log("Authentication Failed please try again");
//     }
//   }

//   handleRedirect = (e) => {
//     const navigate = useNavigate();
//     navigate(`${e._url[e._index]}`);
//   };

//   fetchAllBusData = async () => {
//     let availablecount = 0;
//     let unavailablecount = 0;
//     const available = await getAllAvailableBuses();
//     if (available && available.status === 200) {
//       availablecount = available.data.length;
//     }
//     const unavailable = await getAllUnavailableBuses();
//     if (unavailable && unavailable.status === 200) {
//       unavailablecount = unavailable.data.length;
//     }

//     setTimeout(() => {
//       this.setState({
//         totalBus: {
//           labels: ["Available", "Unavailable"],
//           datasets: [
//             {
//               data: [availablecount, unavailablecount],
//               backgroundColor: ["#36A2EB", "#FFCE56"],
//               hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
//             },
//           ],
//         },
//       });
//     }, 0);
//   };

//   fetchAllPeopleData = async () => {
//     let guestscount = 0;
//     let userscount = 0;
//     let ownerscount = 0;

//     const owners = await getOwners();
//     if (owners && owners.status === 200) {
//       ownerscount = owners.data.length;
//     }

//     const guests = await getGuests();
//     if (guests && guests.status === 200) {
//       guestscount = guests.data.length;
//     }

//     const users = await getUsers();
//     if (users && users.status === 200) {
//       userscount = users.data.length;
//     }

//     setTimeout(() => {
//       this.setState({
//         totalPeople: {
//           labels: ["Owners", "Users", "Guests"],
//           datasets: [
//             {
//               data: [ownerscount, userscount, guestscount],
//               backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
//               hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
//             },
//           ],
//         },
//       });
//     }, 0);
//   };

//   fetchMyBusData = async () => {
//     let availablecount = 0;
//     let unavailablecount = 0;
//     const available = await getAvailableBusesOfOwner();
//     if (available && available.status === 200) {
//       availablecount = available.data.length;
//     }
//     const unavailable = await getUnavailableBusesOfOwner();
//     if (unavailable && unavailable.status === 200) {
//       unavailablecount = unavailable.data.length;
//     }

//     setTimeout(() => {
//       this.setState({
//         myBus: {
//           labels: ["Available", "Unavailable"],
//           datasets: [
//             {
//               data: [availablecount, unavailablecount],
//               backgroundColor: ["#36A2EB", "#FFCE56"],
//               hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
//             },
//           ],
//         },
//       });
//     }, 0);
//   };

//   fetchBookingData = async () => {
//     let verifiedcount = 0;
//     let unverifiedcount = 0;
//     let payedcount = 0;
//     const response = await getOwnerBookings();
//     if (response && response.status === 200 && Array.isArray(response.data)) {
//       for (let i = 0; i < response.data.length; i++) {
//         const booking = response.data[i];
//         if (booking.verification === "verified") {
//           verifiedcount++;
//         } else if (booking.verification === "notverified") {
//           unverifiedcount++;
//         } else if (booking.verification === "payed") {
//           payedcount++;
//         }
//       }
//     }
//     setTimeout(() => {
//       this.setState({
//         myBookings: {
//           labels: ["Verified", "Unverified", "Payed"],
//           datasets: [
//             {
//               data: [verifiedcount, unverifiedcount, payedcount],
//               backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
//               hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
//             },
//           ],
//         },
//       });
//     }, 0);
//   };

//   render() {
//     const { totalBus, totalPeople, myBus, myBookings } = this.state;
//     const { role } = this.state.user;

//     console.log(`total bus : ${totalBus}`);
//     console.log(`total people : ${totalPeople}`);
//     console.log(`my bus : ${myBus}`);
//     console.log(`my booking : ${myBookings}`);

//     return (
//       <Layout>
//         <div className="container">
//           {role === "superadmin" && (
//             <div className="row">
//               <div className="col-md-6">
//                 <h3>Total Buses</h3>
//                 <Pie
//                   data={totalBus}
//                   height={20}
//                   width={50}
//                 //   options={{
//                 //     onClick: (e) => {
//                 //       if (e && e[0] && e[0]._url) {
//                 //         // const navigate = useNavigate();
//                 //         // navigate(e[0]._url[e[0]._index]);
//                 //       }
//                 //     },
//                 //   }}
//                 />
//               </div>
//               <div className="col-md-6">
//                 <h3>Total People</h3>
//                 <Pie
//                   data={totalPeople}
//                   height={20}
//                   width={50}
//                   options={{
//                     onClick: (e) => {
//                       if (e && e[0] && e[0]._url) {
//                         // const navigate = useNavigate();
//                         // navigate(e[0]._url[e[0]._index]);
//                       }
//                     },
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//           <div className="row">
//             <div className="col-md-6">
//               <h3>My Bus</h3>
//               <Pie
//                 data={myBus}
//                 height={20}
//                 width={50}
                
//               />
//             </div>
//             <div className="col-md-6">
//               <h3>Booking Status</h3>
//               {/* <Pie
//                 data={myBookings}
//                 height={20}
//                 width={50}
//                 options={{
//                   onClick: (e) => {
//                     if (e && e[0] && e[0]._url) {
//                     //   const navigate = useNavigate();
//                     //   navigate(e[0]._url[e[0]._index]);
//                     }
//                   },
//                 }}
//               /> */}
//             </div>
//           </div>
//         </div>
//       </Layout>
//     );
//   }
// }

// export default Home;
