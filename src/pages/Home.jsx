import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Home = () => {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const { store, dispatch } = useGlobalReducer();

  const fetchData = async (type, setter) => {
    try {
      const res = await fetch(`https://www.swapi.tech/api/${type}`);
      const data = await res.json();
      setter(data.results);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }
  };

  useEffect(() => {
    fetchData("people", setPeople);
    fetchData("planets", setPlanets);
    fetchData("vehicles", setVehicles);
  }, []);

  const handleFavorite = (item, type) => {
    const exists = store.favorites.find(f => f.uid === item.uid && f.type === type);
    if (exists) {
      dispatch({ type: "REMOVE_FAVORITE", payload: item });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: { ...item, type } });
    }
  };

  const renderCards = (items, type) =>
    items.map(item => (
      <div key={item.uid} className="card m-2" style={{ width: "18rem" }}>
        <img
          src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${item.uid}.jpg`}
          className="card-img-top"
          alt={item.name}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <Link to={`/${type}/${item.uid}`} className="btn btn-outline-primary btn-sm me-2">
            Learn More
          </Link>
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={() => handleFavorite(item, type)}
          >
            ♥
          </button>
        </div>
      </div>
    ));

  return (
    <div className="container mt-4">
      <h2>Characters</h2>
      <div className="d-flex overflow-auto">{renderCards(people, "people")}</div>

      <h2>Planets</h2>
      <div className="d-flex overflow-auto">{renderCards(planets, "planets")}</div>

      <h2>Vehicles</h2>
      <div className="d-flex overflow-auto">{renderCards(vehicles, "vehicles")}</div>

      <h2>Favorites</h2>
      <div className="d-flex overflow-auto">
        {store.favorites.length === 0 ? (
          <p>No favorites yet</p>
        ) : (
          store.favorites.map((fav, i) => (
            <div key={i} className="card m-2" style={{ width: "12rem" }}>
              <img
                src={`https://starwars-visualguide.com/assets/img/${fav.type === "people" ? "characters" : fav.type}/${fav.uid}.jpg`}
                className="card-img-top"
                alt={fav.name}
              />
              <div className="card-body text-center">
                <h6 className="card-title">{fav.name}</h6>
                <Link to={`/${fav.type}/${fav.uid}`} className="btn btn-sm btn-outline-info">
                  View
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

