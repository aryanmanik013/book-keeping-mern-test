import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { post } from "../API/Api";
import { useEffect } from "react";

const Register = () => {
  const [inputs, setInput] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, cpassword } = inputs;
    if (!username || !email || !password || !cpassword) {
      setShowAlert(true);
      setAlertMessage("Please Fill All the fields");
      setAlertVariant("danger");
      return;
    }
    if (password !== cpassword) {
      setShowAlert(true);
      setAlertMessage("Passwords do not match");
      setAlertVariant("danger");
      return;
    }

    const userData = {
      username,
      email,
      password,
    };
    try {
      await post("/register", userData);

      setShowAlert(true);
      setAlertVariant("success");
      setAlertMessage("User Registered - Now You Can Login");
      navigate("/login")
      setInput({});
    } catch (error) {
      console.log("page error", error);
      setShowAlert(true);
      setAlertMessage("User Registration Failed");
      setAlertVariant("danger");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 mx-auto">
          <div className="card card-body bg-light mt-5 shadow-sm">
            <h2 className="text-center">Register</h2>
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={inputs.username || ""}
                  onChange={handleChange}
                  placeholder="Username"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label for="" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  placeholder="Email"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label for="" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  placeholder="Password"
                  class="form-control"
                />
              </div>
              <div class="mb-3">
                <label for="" class="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="cpassword"
                  value={inputs.cpassword || ""}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  class="form-control"
                />
              </div>
              <div class="mb-3 text-center">
                <button type="submit" class="btn btn-primary btn-lg btn-block">
                  Register
                </button>
              </div>
              <div class="mb-3 text-center">
                <Link to="/login">
                  <span>Already Have an Account</span>
                </Link>
              </div>
              {showAlert && (
                <div
                  className={`alert alert-${alertVariant} alert-dismissible fade show`}
                  role="alert"
                >
                  {alertMessage}
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
