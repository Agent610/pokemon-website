import React from "react";
import "./Preloader.css";

const Preloader = ({ message = "Loading..." }) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 20,
        backgroundColor: "#fff",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="preloader-content">
        <h1>{message}</h1>
        <span className="circle-preloader"></span>
      </div>
    </div>
  );
};

export default Preloader;
