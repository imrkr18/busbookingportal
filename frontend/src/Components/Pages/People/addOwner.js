import React, { useState, useEffect } from "react";
import Layout from "./../../Core/Layout";
import Swal from "sweetalert2";
// import ImageUploader from "react-images-upload";
import { addOwner } from "../../../Utils/Requests/People";
import showError from "./../../Core/Error";
import showLoading from "./../../Core/Loading";
import { useNavigate } from "react-router-dom";

const AddOwner = () => {
//   const [formData, setFormData] = useState(new FormData());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [citizenshipNumber, setCitizenshipNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

//   useEffect(() => {
//     setFormData(new FormData());
//   }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!checkPasswordConfirmation()) {
      Swal.fire({
        type: "error",
        title: "Password did not match",
      });
    } else {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("citizenshipNumber", citizenshipNumber);
      formData.append("phone", phone);
        // console.log(formData)
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var jsonObject = JSON.stringify(object);

      const resp = await addOwner(jsonObject).catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
      });

      if (resp && resp.status === 200) {
        setLoading(false);

        Swal.fire({
          type: "success",
          title: "New Owner Added",
        });

        navigate("/people-owners");
      }
    }
  };

  const checkPasswordConfirmation = () => {
    return password === password2;
  };

  const handleChange = (input) => (e) => {
    let value = e.target.value;
    switch (input) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "password2":
        setPassword2(value);
        break;
      case "citizenshipNumber":
        setCitizenshipNumber(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }
    setError("");
  };

  return (
    <Layout title="Update Profile">
      {showError(error)}
      {showLoading(loading)}
      {!loading && (
        <>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Enter your full name"
              onChange={handleChange("name")}
              value={name}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              required
              placeholder="Enter your email"
              onChange={handleChange("email")}
              value={email}
            />
          </div>

          <div className="form-group">
            <label>Citizenship Number</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Enter your citizenship number"
              onChange={handleChange("citizenshipNumber")}
              value={citizenshipNumber}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="number"
              className="form-control"
              required
              placeholder="Enter your phone number"
              onChange={handleChange("phone")}
              value={phone}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              required
              placeholder="Enter the password"
              onChange={handleChange("password")}
              value={password}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              required
              placeholder="Confirm Password"
              onChange={handleChange("password2")}
              value={password2}
            />
          </div>

          <button className="btn btn-success submit-form" onClick={submit}>
            Add Owner
          </button>

          {/* <div className="form-group">
            <ImageUploader
              withIcon={true}
              buttonText="Upload photo"
              onChange={handleChange("photo")}
              imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              singleImage={true}
              withPreview={true}
              buttonStyles={{ display: this.state.buttonStyle }}
              //   defaultImage={values.image}
            />
          </div> */}
        </>
      )}
    </Layout>
  );
};

export default AddOwner;
