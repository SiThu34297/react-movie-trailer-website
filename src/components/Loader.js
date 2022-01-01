import React from "react";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border text-white"
        role="status"
        style={{ width: "5rem", height: "5rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
