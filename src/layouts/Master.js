import React from "react";
import "../css/master.css";
import { Link } from "react-router-dom";

export default function Master({ children }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-indigo">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Movie Trailer
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="container-fluid p-0">{children}</div>
    </div>
  );
}
