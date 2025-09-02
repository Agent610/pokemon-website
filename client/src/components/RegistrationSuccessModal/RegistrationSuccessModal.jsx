import React from "react";
import "./RegistrationSuccessModal.css";

function RegistrationSuccess({ onClose, handleSigninClick }) {
  return (
    <div className="modal modal_opened">
      <div className="registration-success__modal">
        <button
          className="modal__close-button"
          aria-label="Close"
          onClick={onClose}
        />
        <h2 className="registration-success__message">
          Registration successfully completed!
        </h2>
        <button
          onClick={handleSigninClick}
          className="registration-success__button"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default RegistrationSuccess;

//Transition works from Registration -> RegistrationSuccess -> Login
