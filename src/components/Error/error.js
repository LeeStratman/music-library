import React from "react";

const Error = ({ message }) => {
  return (
    <div className="container alert alert-danger" role="alert">
      {message}
    </div>
  );
};

export default Error;
