import React from "react";

function LaodingSpinner() {
  return (
    <div>
      <div className="text-center my-lg-5">
        <div
          className="spinner-border"
          role="status"
          style={{ width: "5rem", height: "5rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default LaodingSpinner;
