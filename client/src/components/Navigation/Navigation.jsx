import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import logout from "../../../images/white-logout.png";
import profileLogout from "../../../images/black-logout.png";

function Navigation({
  isLoggedIn,
  currentUser,
  handleSigninClick,
  handleSignoutClick,
  isPokemonPage,
  handleMobileClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const SignInButton = () => (
    <button className="nav-list__button" onClick={handleSigninClick}>
      Sign in
    </button>
  );

  console.log(currentUser);

  return (
    <nav className="navigation">
      <button className="hamburger-menu" onClick={handleMobileClick}>
        {isMenuOpen ? (
          /*Close (X) icon */
          <div className="close-icon">
            <span className="close-icon__line"></span>
            <span className="close-icon__line"></span>{" "}
          </div>
        ) : (
          /*Hamburger menu lines */
          <>
            <span className="hamburger-menu__line"></span>
            <span className="hamburger-menu__line"></span>
            <span className="hamburger-menu__line"></span>
          </>
        )}
      </button>

      {/*Mobile menu */}
      {window.innerWidth <= 320 && (
        <div className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : ""}`}>
          <div className="mobile-menu__content">
            <ul
              className={`mobile-menu__list ${
                isPokemonPage ? "nav-list_pokemon" : ""
              }`}
            >
              <li className="nav-list__item">
                <Link to="/" className="nav-list__link nav-list__link-home">
                  Home
                </Link>
              </li>
              {!isLoggedIn && (
                <li className="nav-list__item">
                  <SignInButton />
                </li>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-list__item">
                    <Link to="/profile" className="nav-list__link">
                      Pokemon Collection
                    </Link>
                  </li>
                  <li className="nav-list__item">
                    <button
                      className="nav-list__button"
                      onClick={handleSignoutClick}
                    >
                      {currentUser && currentUser.name}
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <ul className={`nav-list ${isPokemonPage ? "nav-list_pokemon" : ""}`}>
        <li className="nav-list__item">
          <Link to="/" className="nav-list__link nav-list__link-home">
            Home
          </Link>
        </li>

        {isLoggedIn ? (
          /* Logged in state */
          <>
            <li className="nav-list__item">
              <Link to="/profile" className="nav-list__link">
                Pokemon Collection
              </Link>
            </li>
            <li className="nav-list__item">
              <button className="nav-list__button" onClick={handleSignoutClick}>
                {currentUser?.name}
                <img
                  src={isPokemonPage ? profileLogout : logout}
                  alt="Logout"
                  className="nav-list__logout"
                />
              </button>
            </li>
          </>
        ) : (
          /* Logged out state */
          <li className="nav-list__item">
            <SignInButton />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;

//Navigation only works in mobile not in Desktop
//Header information is wrong
