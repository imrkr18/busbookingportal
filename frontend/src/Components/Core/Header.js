import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signout, isAuthenticated } from "../../Utils/Requests/Auth";
// import { SERVER_ROUTE } from "../../Utils/config";
import { defaultAdminImage } from "../../Utils/helpers";

const Header =  ({ history }) => {

  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    if (signout()) {
      navigate("/");
    }
  };

  const { user } =  isAuthenticated();

  return (
    <header className="main-header">
      <Link to="/" className="logo">
        <span className="logo-mini">
          <b>DG</b>
        </span>
        <span className="logo-lg">
          <b>BusBooking</b>-Portal
        </span>
      </Link>
      <nav className="navbar navbar-static-top">
        <a
          href={`!#`}
          className="sidebar-toggle"
          data-toggle="push-menu"
          role="button"
        >
          <span className="sr-only">Toggle navigation</span>
        </a>
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li className="dropdown messages-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <h4>Namaste! </h4>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <ul className="menu">
                    <li onClick={handleSignOut}>
                      <a href={`!#`}>
                        <div className="pull-left">
                          <img
                            src={defaultAdminImage}
                            className="img-circle"
                            alt="UserImage"
                          />
                        </div>
                        <h4 style={{ top: "1rem" }}>Logout</h4>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
