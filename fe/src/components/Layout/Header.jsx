import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const history = useNavigate();
  useEffect(() => {
    const userName = localStorage.getItem("email");
    setLoginUser(userName);
  }, []);

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    history("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          Manage Your Books
        </a>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/" aria-current="page">
                Home
              </Link>
            </li>
          </ul>
          <h6 className="header-User">
            <div class="dropdown">
              <button
                class="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {loginUser}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <span style={{cursor:"pointer"}} onClick={logout} class="dropdown-item">
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </h6>
        </div>
      </nav>
    </div>
  );
};

export default Header;
