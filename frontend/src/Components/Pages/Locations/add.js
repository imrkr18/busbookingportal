import React, { useState, useEffect } from "react";
import Layout from "./../../Core/Layout";
import Swal from "sweetalert2";
import showError from "./../../Core/Error";
import showLoading from "./../../Core/Loading";
import { addNewLocation } from "../../../Utils/Requests/Location";
import districtJson from "../../../Utils/helpers/district.json";
import { useNavigate } from "react-router-dom";

const AddLocation = ({ history }) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState("");
  const [district, setDistrict] = useState("Rajkot");
  const navigate = useNavigate();

  useEffect(() => {
    const resp = JSON.parse(JSON.stringify(districtJson));
    setDistricts(resp);
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const resp = await addNewLocation({ name, district }).catch((err) => {
      setLoading(false);
      setError(err.response.data.error);
    });

    if (resp && resp.status === 200) {
      setLoading(false);
      Swal.fire({
        type: "success",
        title: "Successfully add new location!",
        
      });
      navigate("/locations");
    }
  };

  const handleChange = (input) => (e) => {
    const value = e.target.value;

    if (input === "name") {
      setName(value);
    } else if (input === "district") {
      setDistrict(value);
    }
  };

  return (
    <Layout title="Add Location">
      {showError(error)}
      {showLoading(loading)}
      {!loading && (
        <>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Location Name"
              onChange={handleChange("name")}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>District</label>
            <select
              className="custom-select custom-select-sm form-control"
              onChange={handleChange("district")}
              value={district}
            >
              <option value="Default" disabled>
                Select District
              </option>
              {districts.length > 0 &&
                districts.map((location) => (
                  <option value={location} key={location}>
                    {location}
                  </option>
                ))}
            </select>
          </div>

          <button className="btn btn-success submit-form" onClick={submit}>
            Add Location
          </button>
        </>
      )}
    </Layout>
  );
};

export default AddLocation;
