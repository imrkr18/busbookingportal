import React, { useState } from "react";
import Layout from "./../../Core/Layout";
import Swal from "sweetalert2";
import showError from "./../../Core/Error";
import showLoading from "./../../Core/Loading";
import { addNewTravel } from "../../../Utils/Requests/Travel";
import { useNavigate } from "react-router-dom";

const AddTravel = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const resp = await addNewTravel({ name });

      if (resp && resp.status === 200) {
        setLoading(false);

        Swal.fire({
          type: "success",
          title: "Successfully add new travel!",
          onRender: () => {
            navigate("/travels");
          }
        });
      }
    } catch (err) {
      setLoading(false);
      setError(err.response.data.error);
    }
  };

  const handleChange = (input) => (e) => {
    const value = e.target.value;
    setName(value);
  };

  return (
    <Layout title="Add Travel">
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
              value={name}
            />
          </div>

          <button className="btn btn-success submit-form" onClick={submit}>
            Add travel
          </button>
        </>
      )}
    </Layout>
  );
};

export default AddTravel;
