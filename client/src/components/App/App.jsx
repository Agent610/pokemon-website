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
import Navigation from "../Navigation/Navigation.jsx";
import { login, register, setToken, removeToken } from "../../../utils/auth.js";
import {
  fetchPokemon,
  savePokemon,
  deletePokemon,
  getSavedPokemon,
} from "../../../utils/Pokemon.js";
import Main from "../Main/Main.jsx";
import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import PokemonGrid from "../PokemonGrid/PokemonGrid.jsx";
import Profile from "../Profile/Profile.jsx";

function App() {
  //Location
  const location = useLocation();

  //User
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

  //SearchBar.jsx
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [message, setMessage] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

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

  //Preloader
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [authAction, setAuthAction] = useState("");

  //Pokemon Work
  const handleSearch = (query) => {
    setIsSearchLoading(true);
    setHasSearched(true);

    fetchPokemon(query)
      .then((data) => {
        if (data) {
          setSearchResults([data]);
        } else {
          setSearchResults([]);
        }
      })
      .catch((error) => {
        console.error("Error loading Pokemon", error);
        setSearchResults([]);
      })
      .finally(() => {
        setIsSearchLoading(false);
      });
  };

  const EvolutionList = ({ chain }) => {
    return (
      <li>
        <img
          src={chain.sprite}
          alt={chain.species}
          width={50}
          style={{ marginRight: "8px" }}
        />
        {chain.species}
        {chain.details.length > 0 && <span> ({chain.details.join(", ")})</span>}
        {chain.evolvesTo.length > 0 && (
          <ul style={{ marginLeft: "20px" }}>
            {chain.evolvesTo.map((evo) => (
              <EvolutionList key={evo.species} chain={evo} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  //Pokemon Work p.2
  const [savedPokemon, setSavedPokemon] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      getSavedPokemon(currentUser._id).then((data) => setSavedPokemon(data));
    } else {
      setSavedPokemon([]);
    }
  }, [isLoggedIn, currentUser]);

  //Save and Delete Pokemon
  const handleSavePokemon = (pokemon) => {
    if (!currentUser._id) return;

    savePokemon(currentUser._id, pokemon).then((newPokemon) => {
      if (newPokemon) setSavedPokemon((prev) => [...prev, newPokemon]);
    });
  };

  const handleDeletePokemon = (pokemonId) => {
    if (!currentUser._id) return;

    deletePokemon(currentUser._id, pokemonId).then(() => {
      setSavedPokemon((prev) => prev.filter((p) => p._id !== pokemonId));
    });
  };

  //Authentication

  const handleLogin = ({ email, password }) => {
    setAuthAction("login");
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
        setAuthAction("");
      });
  };

  const handleRegister = ({ email, password, userName }) => {
    setAuthAction("register");
    setIsAuthLoading(true);

    register({ email, password, userName })
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
        setAuthAction("");
      });
  };
  const handleSignoutClick = () => {
    removeToken();
    localStorage.removeItem("currentUser");
    setLoggedIn(false);
    setCurrentUser({});
    setSavedPokemon([]);
  };

  //Load user from LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="app-container">
      {/* --- Preloader --- */}
      {(isAuthLoading || isSearchLoading) && (
        <Preloader
          message={
            isAuthLoading
              ? authAction === "register"
                ? "Registering..."
                : "Logging in..."
              : "Searching for Pokemon..."
          }
        />
      )}
      <div
        className={`main-content ${
          location.pathname === "/" ? "home-background" : ""
        }`}
      >
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

        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                searchResults={searchResults}
                hasSearched={hasSearched}
                isSearchLoading={isSearchLoading}
                handleSavePokemon={handleSavePokemon}
                savedPokemon={savedPokemon}
                handleDeletePokemon={handleDeletePokemon}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <Profile
                savedPokemon={savedPokemon}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                handleDeletePokemon={handleDeletePokemon}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
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
