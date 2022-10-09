import React from "react";

const Errors = ({ errors }) => {
  return (
    <div>
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </div>
  );
};

export default Errors;
