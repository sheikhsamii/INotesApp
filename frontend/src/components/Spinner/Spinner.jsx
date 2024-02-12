import React from "react";
import loading from "../../assets/loading.gif";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <img src={loading} width={60} height={60}  alt="loading" />
    </div>
  );
};

export default Spinner;
