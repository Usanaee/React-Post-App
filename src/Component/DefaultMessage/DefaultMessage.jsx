import React from "react";

function DefaultMessage() {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <div className="alert alert-warning m-5" role="alert">
        <p className="text-center m-5 fs-5 text-uppercase">
          Here Is No Post Yet Posted!
        </p>
      </div>
    </div>
  );
}

export default DefaultMessage;
