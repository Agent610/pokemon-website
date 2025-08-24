import { useState } from "react";
import "./Header.css";
import Nav from "../Nav/Nav.jsx";

function Header({ user, onSignIn, onSignOut }) {
  return (
    <header className="header">
      <div className="header__logo">Everything Pokemon !</div>
      <Nav user={user} onSignIn={onSignIn} onSignOut={onSignOut} />
    </header>
  );
}

export default Header;
