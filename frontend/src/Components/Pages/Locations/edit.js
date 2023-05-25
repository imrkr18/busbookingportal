import React, { useState, useEffect } from "react";
import Layout from "./../../Core/Layout";
import Swal from "sweetalert2";
import showError from "./../../Core/Error";
import showLoading from "./../../Core/Loading";
import { getALocation, updateLocation } from "../../../Utils/Requests/Location";
import districtJson from "../../../Utils/helpers/district.json";
import { useNavigate } from "react-router-dom";

const EditLocation = ({ match }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({});
  const [districts, setDistricts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLocation();
    const resp = JSON.parse(JSON.stringify(districtJson));
    setDistricts(resp);
  }, []);

  const fetchLocation = async () => {
    const { slug } = match.params;

    const resp = await getALocation(slug).catch((err) => {
      setError(err.response.data.error);
      setLoading(false);
    });

    if (resp && resp.status === 200) {
      setLocation(resp.data);
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const { _id, name, district } = location;

    const resp = await updateLocation(_id, location).catch((err) => {
      setLoading(false);
      setError(err.response.data.error);
    });

    if (resp && resp.status === 200) {
      setLoading(false);
      Swal.fire({
        type: "success",
        title: "Successfully updated the location!",
        onRender: () => {
          navigate("/locations");
        },
      });
    }
  };

  const handleChange = (input) => (e) => {
    const value = e.target.value;

    setLocation((prevState) => ({
      ...prevState,
      [input]: value,
    }));
    setError("");
  };

  const { name, district } = location;

  return (
    <Layout title="Update Location">
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
            Update Location
          </button>
        </>
      )}
    </Layout>
  );
};

export default EditLocation;
