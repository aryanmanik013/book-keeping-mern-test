import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../API/Api";
const Login = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputs;
    if (!email || !password) {
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertMessage("Please enter email and password");
      return;
    }
    const userData = {
      email,
      password,
    };

    try {
      const response = await post("/login", userData);
      console.log("response", response);
      console.log("token", response.token);
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      setShowAlert(true);
      setAlertVariant("success");
      setAlertMessage("Logged In");
      history("/");
      return;
    } catch (error) {}
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history("/");
    }
  }, [history]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <div className="card card-body bg-light mt-5 shadow-sm">
              <h2 className="text-center">Login</h2>
              <form onSubmit={handleSubmit}>
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
                <div class="mb-3 text-center">
                  <button type="input" class="btn btn-primary btn-lg btn-block">
                    Login{" "}
                  </button>
                </div>
                <div class="mb-3 text-center">
                  <Link to="/register">
                    <span>New User ? Register Here</span>
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
    </>
  );
};

export default Login;
