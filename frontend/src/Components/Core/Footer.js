import React from "react";
import '../../styles/_footer.scss'; 

const Footer = () => {
  return (
    <div className="box-footer">
      <div className="row">
        <div>
          <div className="description-block border-right">
            <h5 className="description-header">
              &copy; {new Date().getFullYear()} BusBooking-Portal
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
