import { useState } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";

function Header({ user, onSignIn, onSignOut }) {
  return (
    <header className="header">
      <div className="header__logo">Everything Pokemon !</div>
      <nav className="nav-links">
        <a href="/">Home</a>
        {user ? (
          <>
            <span className="username">{user.name}</span>
            <button onClick={onSignOut}>Sign Out</button>
          </>
        ) : (
          <button onClick={onSignIn}>Sign In</button>
        )}
      </nav>
    </header>
  );
}

export default Header;

/*Use the NewsExplorer */
