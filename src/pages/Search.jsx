import React, { useCallback, useEffect, useState } from "react";
import "./Search.css";
import DefiLogo from "../assets/defi-decentralized-finance-for-exchange-cryptocurrency-defi-text-logo-design-finance-system-block-chain-and-walllet-blue-dark-technology-system-with-alt-coin-icon-vector.jpg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "lucide-react";
import axios from "axios";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("search") || "";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [sortType, setSortType] = useState("");
  const [matchedCoins, setMatchedCoins] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const applySort = useCallback((coinList, selectedSort) => {
    const sortedCoins = [...coinList];

    if (selectedSort === "NAME_SORT") {
      sortedCoins.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === "SYMBOL_SORT") {
      sortedCoins.sort((a, b) => a.symbol.localeCompare(b.symbol));
    } else if (selectedSort === "RANK_SORT") {
      sortedCoins.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
    } else if (selectedSort === "PRICE_SORT") {
      sortedCoins.sort((a, b) => b.current_price - a.current_price);
    }

    return sortedCoins;
  }, []);

  const fetchAndSetCoins = useCallback(async (normalizedTerm, selectedSort = "") => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 250,
            page: 1,
            sparkline: false,
          },
        },
      );

      const filteredCoins = response.data.filter(
        (coin) =>
          coin.name.toLowerCase().includes(normalizedTerm.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(normalizedTerm.toLowerCase()),
      );

      if (!filteredCoins.length) {
        setCoins([]);
        setMatchedCoins([]);
        setError(`No coins found matching "${normalizedTerm}".`);
        return;
      }

      setMatchedCoins(filteredCoins);
      setCoins(applySort(filteredCoins, selectedSort).slice(0, 6));
    } catch {
      setCoins([]);
      setMatchedCoins([]);
      setError("Unable to load coin data right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [applySort]);

  async function handleSearch(event) {
    event.preventDefault();

    const normalizedTerm = searchTerm.trim();
    if (!normalizedTerm) {
      setCoins([]);
      setMatchedCoins([]);
      setError("Please provide a valid search value.");
      return;
    }

    await fetchAndSetCoins(normalizedTerm, sortType);
  }

  function handleSortChange(event) {
    const selectedSort = event.target.value;
    setSortType(selectedSort);

    if (matchedCoins.length > 0) {
      setCoins(applySort(matchedCoins, selectedSort).slice(0, 6));
    }
  }

  useEffect(() => {
    document.body.classList.toggle("menu--open", isMenuOpen);
    return () => document.body.classList.remove("menu--open");
  }, [isMenuOpen]);

  useEffect(() => {
    if (querySearch.trim()) {
      const normalizedTerm = querySearch.trim();
      setSearchTerm(normalizedTerm);

      fetchAndSetCoins(normalizedTerm, "");
    }
  }, [querySearch, fetchAndSetCoins]);

  return (
    <div className="search-page">
      <header className="search-navbar">
        <div className="nav__row">
          <div className="logo">
            <img src={DefiLogo} alt="DeFi logo" className="logo" />
          </div>
          <div className="nav__links">
            <Link to="/" className="link__hover-effect">
              Home
            </Link>
            <Link to="/search" className="link__hover-effect">
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
            <Menu size={44} strokeWidth={3.25} color="white" aria-hidden="true" />
          </button>
          <div className="menu__backdrop">
            <button
              className="btn__menu menu__close"
              onClick={() => setIsMenuOpen(false)}
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
        <div className="content__wrapper">
          <h1>Browse Your Coin</h1>
          <form className="input-wrap" onSubmit={handleSearch} autoComplete="off">
            <input
              type="text"
              name="coin-query"
              id="search-details"
              placeholder="Search by Name or Symbol"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-wrapper" type="submit" aria-label="Search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
        <div className="background-img"></div>
      </header>
      <section className="search">
        <div className="filter__wrapper">
          <h1 className="search__info">Search Results:</h1>
          <div className="price__filter">
            <h2>Coin Sort:</h2>
            <select id="filter" value={sortType} onChange={handleSortChange}>
              <option value="">Default</option>
              <option value="NAME_SORT">Sort by Name</option>
              <option value="SYMBOL_SORT">Sort by Symbol</option>
              <option value="RANK_SORT">Sort by Rank</option>
              <option value="PRICE_SORT">Sort by Price</option>
            </select>
          </div>
        </div>
        <div className="coin__container">
          {loading ? (
            <div className="coin__row">
              <h1 className="search__suggestion">Loading coins...</h1>
            </div>
          ) : error ? (
            <div className="coin__row">
              <h1 className="search__suggestion">{error}</h1>
            </div>
          ) : coins.length > 0 ? (
            coins.map((coin) => (
              <div
                key={coin.id}
                className="coin-info"
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/${coin.id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    navigate(`/${coin.id}`);
                  }
                }}
              >
                <div className="coin-info__container">
                  <h3>{coin.name}</h3>
                  <p>
                    <b>Symbol:</b>{" "}
                    <span className="uppercase">{coin.symbol}</span>
                  </p>
                  <p>
                    <b>Rank:</b> {coin.market_cap_rank}
                  </p>
                  <p>
                    <b>Price:</b> ${coin.current_price}
                  </p>
                </div>
                <img src={coin.image} alt={coin.name} />
              </div>
            ))
          ) : (
            <div className="coin__row">
              <h1 className="search__suggestion">
                Try Searching for a Coin by Name or Symbol
              </h1>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Search;
