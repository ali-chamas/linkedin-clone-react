import React from "react";

const Request = ({ request }) => {
  return (
    <div className="flex gap align-center request-card justify-between">
      <div className="flex gap align-center">
        <img src={request.fromImg} alt="" />
        <div className="flex column small-gap">
          <h3>{request.fromName}</h3>
          <p className="text-gray">{request.fromPosition}</p>
          <small className="text-gray">{request.fromLocation}</small>
        </div>
      </div>
      <div className="flex gap buttons-container">
        <button className="btn-style bg-blue text-white">accept</button>
        <button className="btn-style bg-primary text-primary border-blue">
          cancel
        </button>
      </div>
    </div>
  );
};

export default Request;
