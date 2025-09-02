import React from "react";
import "./Preloader.css";

const Preloader = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 20,
        backgroundColor: "#fff",
        zIndex: 9999,
      }}
    >
      <div className="preloader-content">
        <h1>Searching for Pokemon...</h1>
        <span className="circle-preloader"></span>
      </div>
    </div>
  );
};

export default Preloader;

//Doing what is need to do and is presented the way it should be only when I am searching for Pokemon it stays there and when I go to RegisterModal try to register this popup comes | Same goes for LoginModal
