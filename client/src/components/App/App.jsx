import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import LoginModal from "../LogInModal/LogInModal.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import RegistrationSuccess from "../RegistrationSuccessModal/RegistrationSuccessModal.jsx";
import MobileModal from "../MobileModal/MobileModal.jsx";
//import Main from "../Main/Main.jsx";

function App() {
  //Location
  const location = useLocation();

  //User
  const [currentUser, setCurrentUser] = useState({});

  //If Logged in
  const [isLoggedIn, setLoggedIn] = useState(false);

  //SearchBar.jsx
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [message, setMessage] = useState("");

  //Modals
  const [activeModal, setActiveModal] = useState("");

  const handleCloseModal = () => {
    setActiveModal("");
  };
  React.useEffect(() => {
    if (activeModal) {
      // Handle Escape Key
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          handleCloseModal();
        }
      };

      // Handle click outside key
      const handleClickOutside = (event) => {
        if (event.target.classList.contains("modal")) {
          handleCloseModal();
        }
      };

      // Event Listenters
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [activeModal]);

  //Pokemon Work
  const handleSearch = (query) => {
    setIsSearchLoading(true);
    setHasSearched(true);
    setSearchKeyword(query);

    searchPokemon(query)
      .then((response) => {
        setSearchResults(response);
        setShowSearchBar(true);
      })
      .catch((error) => {
        console.error("Error loading Pokemon:", error);
        setSearchResults([]);
      })
      .finally(() => {
        setIsSearchLoading(false);
      });
  };

  //Authentication

  const handleLogin = ({ email, password }) => {
    setIsAuthLoading(true);

    login({ email, password })
      .then((response) => {
        if (response.token) {
          setToken(response.token);
          setLoggedIn(true);
          setCurrentUser(response.user);
          localStorage.setItem("currentUser", JSON.stringify(response.user));
          handleCloseModal();
        }
      })
      .catch((error) => {
        console.error("Login failed", error);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const handleRegister = ({ email, password, userName }) => {
    setIsAuthLoading(true);

    RegisterModal({ email, password, userName })
      .then((response) => {
        if (response) {
          setMessage("Registration successfully completed !");
          setActiveModal("registerSuccess");
        }
      })
      .catch((error) => {
        console.error("Registration failed", error);
        setMessage("Registration failed");
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const handleSignoutClick = () => {
    removeToken();
    setLoggedIn(false);
  };

  return (
    <div className="app-container">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        handleSigninClick={() => setActiveModal("login")}
        handleSignoutClick={handleSignoutClick}
        showSearchBar={showSearchBar}
        handleSearch={handleSearch}
        setShowSearchBar={setShowSearchBar}
        handleMobileClick={() => setActiveModal("mobile")}
      />

      <h2>Welcome to the Pokemon App !</h2>
      <About />
      <Footer> </Footer>

      {/* Modal Logic */}

      {activeModal === "registerSuccess" && (
        <RegistrationSuccess
          onClose={handleCloseModal}
          handleSigninClick={() => setActiveModal("login")}
        />
      )}

      <LoginModal
        isOpen={activeModal === "login"}
        onSubmit={handleLogin}
        onClose={handleCloseModal}
        handleSignupClick={() => setActiveModal("register")}
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onSubmit={handleRegister}
        onClose={handleCloseModal}
        handleSigninClick={() => setActiveModal("login")}
      />

      <MobileModal
        isOpen={activeModal === "mobile"}
        onClose={handleCloseModal}
        handleSigninClick={() => setActiveModal("login")}
        isLoggedIn={isLoggedIn}
        handleSignoutClick={handleSignoutClick}
        currentUser={currentUser}
      />
    </div>
  );
}

export default App;
