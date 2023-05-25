import React, { useState, useEffect } from "react";
import Layout from "./../../Core/Layout";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { addNewBus, updateBus } from "../../../Utils/Requests/Bus";

const Success = ({ values, isUpdate, match }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();



  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }

      try {
        if (isUpdate) {
          await updateBus(slug, formData);
        } else {
          await addNewBus(formData);
        }
        setLoading(false);
      } catch (err) {
        setError(err.response.data.error);
        setLoading(false);
      }
    };
    fetchData();
  }, [values, isUpdate, slug]);

  const renderMessage = () => {
    const message = isUpdate ? "updated" : "added";
    if (error) {
      Swal.fire({
        type: "error",
        title: error,
      });
      navigate("/");
    } else {
      Swal.fire({
        type: "success",
        title: `Successfully ${message} the bus!`,
      });
      navigate("/");
    }
  };

  const loadingShow = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <Layout>
      {loading ? loadingShow() : renderMessage()}
    </Layout>
  );
}

export default Success;
