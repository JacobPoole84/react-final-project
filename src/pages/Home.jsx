import React, { useEffect, useState } from "react";
import "./Home.css";
import CoinImage from "../assets/ coin.png";
import CryptoCity from "../assets/cryptocurrency-blockchain-smart-city-digital-futuristic-concept-vector-illustration-260228391.jpg";
import DefiLogo from "../assets/defi-decentralized-finance-for-exchange-cryptocurrency-defi-text-logo-design-finance-system-block-chain-and-walllet-blue-dark-technology-system-with-alt-coin-icon-vector.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { LoaderCircle, Menu } from "lucide-react";

const Home = () => {
  const [searchDetails, setSearchDetails] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoinAnimatingIn, setIsCoinAnimatingIn] = useState(false);
  const [isSubmittingSearch, setIsSubmittingSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("menu--open", isMenuOpen);
    return () => document.body.classList.remove("menu--open");
  }, [isMenuOpen]);

  function sendSearch(event) {
    event.preventDefault();
    const input = searchDetails;
    if (!input || input.trim().length === 0) {
      setIsSubmittingSearch(false);
      return;
    }
    setIsSubmittingSearch(true);
    setIsCoinAnimatingIn(false);
    navigate(`/search?search=${encodeURIComponent(input.trim())}`);
  }

  const coinAnimationClass = isCoinAnimatingIn
    ? "slide-in-rotate"
    : "slide-out-rotate";

  return (
    <div className="home">
      <header className="home-navbar">
        <div className="nav__row">
          <div className="logo">
            <img src={DefiLogo} alt="DeFi logo" className="logo" />
          </div>
          <div className="nav__links">
            <Link to="/" className="link__home link__hover-effect">
              Home
            </Link>
            <Link to="/search" className="link__blue link__hover-effect">
              Find Your Crypto
            </Link>
            <a
              href="mailto:jacobpoole84@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="contact"
            >
              Contact
            </a>
          </div>
          <button
            className={`btn__menu${isMenuOpen ? " is-active" : ""}`}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={44} strokeWidth={3.25} aria-hidden="true" />
          </button>
          <div className="menu__backdrop">
            <button
              className="btn__menu menu__close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <ul className="menu__links">
              <li className="menu__list">
                <Link
                  to="/"
                  className="menu__link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="menu__list">
                <Link
                  to="/search"
                  className="menu__link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Search Your Crypto
                </Link>
              </li>
              <li className="menu__list">
                <a
                  href="mailto:jacobpoole84@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="menu__link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <section id="landing__page" className={coinAnimationClass}>
        <div className="title">
          <h1>The best cryptocurrency search platform</h1>
        </div>
        <div className="sub-title">
          <h2>
            FIND ANY <span className="black">CRYPTO</span> YOU LIKE, INSTANTLY
          </h2>
        </div>
        <form className="search__form" onSubmit={sendSearch} autoComplete="off">
          <div className="input__wrapper">
            <input
              type="search"
              name="coin-query"
              id="search-details"
              placeholder="Search by Name or Symbol"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              onClick={() => setIsCoinAnimatingIn(true)}
              value={searchDetails}
              onChange={(e) => setSearchDetails(e.target.value)}
            />
            <button className="btn__search" type="submit">
              {isSubmittingSearch ? (
                <LoaderCircle
                  className="home-search-loader"
                  size={40}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              ) : (
                <FontAwesomeIcon id="loading" icon={faMagnifyingGlass} />
              )}
            </button>
          </div>
        </form>

        <figure className="img__wrapper">
          <img src={CryptoCity} alt="" className="city" />
          <div className="coin__wrapper">
            <img src={CoinImage} alt="" className="coin__img" />
          </div>
        </figure>
      </section>
    </div>
  );
};

export default Home;
