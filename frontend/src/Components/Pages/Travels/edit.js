import React, { useState, useEffect } from "react";
import Layout from "./../../Core/Layout";
import Swal from "sweetalert2";
import showError from "./../../Core/Error";
import showLoading from "./../../Core/Loading";
import districtJson from "../../../Utils/helpers/district.json";
import { getATravel, updateTravel } from "../../../Utils/Requests/Travel";
import { useParams, useNavigate } from "react-router-dom";

const EditTravel = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [travel, setTravel] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    fetchTravel();
  }, []);

  const fetchTravel = async () => {
    try {
      const resp = await getATravel(slug);
      if (resp && resp.status === 200) {
        setTravel(resp.data);
        setLoading(false);
      }
    } catch (err) {
      setError(err.response.data.error);
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const resp = await updateTravel(travel._id, travel);
      if (resp && resp.status === 200) {
        Swal.fire({
          type: "success",
          title: "Successfully updated the travel!",
          onRender: () => {
            navigate("/travels");
          }
        });
      }
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleChange = (input) => (e) => {
    const value = e.target.value;
    setTravel(prevState => ({
      ...prevState,
      [input]: value
    }));
    setError("");
  };

  return (
    <Layout title="Update travel">
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
              placeholder="Travel Name"
              onChange={handleChange("name")}
              value={travel.name}
            />
          </div>

          <button className="btn btn-success submit-form" onClick={submit}>
            Update Travel
          </button>
        </>
      )}
    </Layout>
  );
};

export default EditTravel;
