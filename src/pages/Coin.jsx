import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Coin.css";

const Coin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCoin() {
      if (!id) {
        setError("Coin ID is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`,
          {
            params: {
              localization: false,
              tickers: false,
              market_data: true,
              community_data: true,
              developer_data: true,
              sparkline: false,
            },
          },
        );
        setCoin(response.data);
      } catch (fetchError) {
        setError("Unable to load this coin right now. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCoin();
  }, [id]);

  function formatCurrency(value) {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);
  }

  function formatNumber(value) {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-US").format(value);
  }

  if (loading) {
    return <div className="coin-page">Loading coin details...</div>;
  }

  if (error || !coin) {
    return (
      <div className="coin-page">
        <p>{error || "Coin data not found."}</p>
        <button className="coin-back-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const market = coin.market_data || {};
  const links = coin.links || {};
  const description = coin.description?.en || "No description available.";

  return (
    <main className="coin-page">
      <button className="coin-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <section className="coin-card">
        <div className="coin-header">
          <img src={coin.image?.large} alt={coin.name} className="coin-logo" />
          <div>
            <h1>{coin.name}</h1>
            <p>
              {coin.symbol?.toUpperCase()} • Rank #{coin.market_cap_rank || "N/A"}
            </p>
          </div>
        </div>

        <div className="coin-grid">
          <div>
            <h3>Price</h3>
            <p>{formatCurrency(market.current_price?.usd)}</p>
          </div>
          <div>
            <h3>Market Cap</h3>
            <p>{formatCurrency(market.market_cap?.usd)}</p>
          </div>
          <div>
            <h3>24h Volume</h3>
            <p>{formatCurrency(market.total_volume?.usd)}</p>
          </div>
          <div>
            <h3>24h High / Low</h3>
            <p>
              {formatCurrency(market.high_24h?.usd)} / {formatCurrency(market.low_24h?.usd)}
            </p>
          </div>
          <div>
            <h3>All-Time High</h3>
            <p>{formatCurrency(market.ath?.usd)}</p>
          </div>
          <div>
            <h3>All-Time Low</h3>
            <p>{formatCurrency(market.atl?.usd)}</p>
          </div>
          <div>
            <h3>Circulating Supply</h3>
            <p>{formatNumber(market.circulating_supply)}</p>
          </div>
          <div>
            <h3>Total Supply</h3>
            <p>{formatNumber(market.total_supply)}</p>
          </div>
          <div>
            <h3>Max Supply</h3>
            <p>{formatNumber(market.max_supply)}</p>
          </div>
          <div>
            <h3>Genesis Date</h3>
            <p>{coin.genesis_date || "N/A"}</p>
          </div>
        </div>

        <div className="coin-links">
          <h3>Links</h3>
          {links.homepage?.[0] ? (
            <a href={links.homepage[0]} target="_blank" rel="noreferrer">
              Official Website
            </a>
          ) : (
            <p>N/A</p>
          )}
        </div>

        <div className="coin-description">
          <h3>Description</h3>
          <p>{description.replace(/<[^>]*>/g, "")}</p>
        </div>
      </section>
    </main>
  );
};

export default Coin;