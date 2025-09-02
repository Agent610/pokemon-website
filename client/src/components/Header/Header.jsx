import { useContext } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { useLocation } from "react-router-dom";

function Header({
  isLoggedin,
  currentUser,
  handleSigninClick,
  handleSignoutClick,
  showSearchBar,
  handleSearch,
  setShowSearchBar,
  handleMobileClick,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isProfilePage = location.pathname === "/profile";

  return (
    <header className={isProfilePage ? "header__profile" : "header"}>
      <div className="header__nav-bar">
        <h1 className={isProfilePage ? "header__profile-logo" : "header__logo"}>
          Everything Pokemon !
        </h1>

        <Navigation
          isLoggedin={isLoggedin}
          currentUser={currentUser}
          handleSigninClick={handleSigninClick}
          handleSignoutClick={handleSignoutClick}
          isProfilePage={isProfilePage}
          handleMobileClick={handleMobileClick}
        />
      </div>

      {isHomePage && (
        <div className="header__search-bar">
          <h1 className="main__title">Gotta catch 'em all!</h1>
          <p className="main__info">
            What Pokemon are you looking for ? Search for them, catch them and
            add them to your collection.
          </p>
          {showSearchBar ? (
            <SearchBar onSearch={handleSearch} />
          ) : (
            <button onClick={() => setShowSearchBar(true)}>Search</button>
          )}
        </div>
      )}
    </header>
  );
}
export default Header;

//Not logged in = Home | Sign in
//Logged in = Home | Username | Logout it's not showing that
