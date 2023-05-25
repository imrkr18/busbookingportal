import React, { useState, useEffect } from "react";
import Layout from "./../../Core/Layout";
import Swal from "sweetalert2";
import ImageUploader from "react-images-upload";
import { updateOwner } from "../../../Utils/Requests/People";
import showError from "./../../Core/Error";
import showLoading from "./../../Core/Loading";
import {
  isAuthenticated,
  refreshToken,
  authenticate
} from "../../../Utils/Requests/Auth";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [buttonStyle, setButtonStyle] = useState("block");
  const [formData, setFormData] = useState(new FormData());
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(new FormData());
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if ((oldPassword && newPassword) || photo) {
      try {
        const resp = await updateOwner(isAuthenticated().user._id, formData);
        if (resp && resp.status === 200) {
          const data = await refreshToken(isAuthenticated().user._id);
          if (data && data.status === 200) {
            authenticate(data, () => {
              if (isAuthenticated()) {
                setLoading(false);
              }
            });
          }
          setLoading(false);
          Swal.fire({
            type: "success",
            title: "Successfully updated the profile!",
            onRender: () => {
              navigate("/");
            }
          });
        }
      } catch (err) {
        setLoading(false);
        setError(err.response.data.error);
      }
    } else {
      Swal.fire({
        type: "error",
        title: "Can not submit empty form!"
      });
      setLoading(false);
    }
  };

  const handleChange = (input) => (e) => {
    let value;
    if (input === "photo") {
      if (e.length === 0) {
        setButtonStyle("block");
        setPhoto("");
        return;
      }
      value = e[0];
      setButtonStyle("none");
    } else {
      value = e.target.value;
    }

    formData.set(input, value);
    setError("");
    setOldPassword(value);
    setNewPassword(value);
    setPhoto(value);
  };

  return (
    <Layout title="Update Profile">
      {showError(error)}
      {showLoading(loading)}
      {!loading && (
        <>
          <div className="form-group">
            <label>Old Password</label>
            <input
              type="password"
              className="form-control"
              required
              placeholder="Enter the old password"
              onChange={handleChange("oldPassword")}
              value={oldPassword}
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              required
              placeholder="Enter the new password"
              onChange={handleChange("newPassword")}
              value={newPassword}
            />
          </div>

          <button className="btn btn-success submit-form" onClick={submit}>
            Update Profile
          </button>

          <div className="form-group">
            <ImageUploader
              withIcon={true}
              buttonText="Upload photo"
              onChange={handleChange("photo")}
              imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              singleImage={true}
              withPreview={true}
              buttonStyles={{ display: buttonStyle }}
              //   defaultImage={values.image}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default EditProfile;
