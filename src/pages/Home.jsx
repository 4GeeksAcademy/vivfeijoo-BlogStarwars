import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchData("people", setPeople);
    fetchData("planets", setPlanets);
    fetchData("vehicles", setVehicles);
  }, []);

  const fetchData = async (type, setState) => {
    try {
      const res = await fetch(`https://www.swapi.tech/api/${type}`);
      const data = await res.json();

      const resultsWithDetails = await Promise.all(
        data.results.map(async (item) => {
          try {
            const detailRes = await fetch(item.url);
            const detailData = await detailRes.json();
            return {
              ...item,
              ...detailData.result.properties,
            };
          } catch (err) {
            console.error(`Error fetching detail for ${item.name}:`, err);
            return item; // fallback
          }
        })
      );

      setState(resultsWithDetails);
    } catch (error) {
      console.error(`Error loading ${type}:`, error);
    }
  };

  const getImage = (type, uid) =>
    `https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${uid}.jpg`;

  const isFavorite = (item) =>
    store.favorites.some((fav) => fav.uid === item.uid && fav.type === item.type);

  const toggleFavorite = (item, type) => {
    const payload = { ...item, type };
    if (isFavorite(payload)) {
      dispatch({ type: "REMOVE_FAVORITE", payload });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload });
    }
  };

  const renderCards = (items, type) =>
    items.map((item) => (
      <div className="card mx-2" style={{ width: "18rem", minWidth: "250px" }} key={item.uid}>
        <img
          src={getImage(type, item.uid)}
          className="card-img-top"
          alt={item.name}
          onError={(e) => {
            if (!e.target.src.includes("big-placeholder.jpg")) {
              e.target.src =
                "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
            }
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <ul className="list-unstyled">
            {type === "people" && (
              <>
                <li><strong>Gender:</strong> {item.gender || "n/a"}</li>
                <li><strong>Hair Color:</strong> {item.hair_color || "n/a"}</li>
                <li><strong>Eye Color:</strong> {item.eye_color || "n/a"}</li>
              </>
            )}
            {type === "planets" && (
              <>
                <li><strong>Population:</strong> {item.population || "n/a"}</li>
                <li><strong>Climate:</strong> {item.climate || "n/a"}</li>
                <li><strong>Terrain:</strong> {item.terrain || "n/a"}</li>
              </>
            )}
            {type === "vehicles" && (
              <>
                <li><strong>Model:</strong> {item.model || "n/a"}</li>
                <li><strong>Manufacturer:</strong> {item.manufacturer || "n/a"}</li>
                <li><strong>Cost:</strong> {item.cost_in_credits || "n/a"}</li>
              </>
            )}
          </ul>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <Link
              to={`/${type}/${item.uid}`}
              className="btn btn-outline-primary btn-sm"
            >
              Learn more!
            </Link>
            <button
              className={`btn btn-sm ${isFavorite({ ...item, type }) ? "btn-warning" : "btn-outline-warning"}`}
              onClick={() => toggleFavorite(item, type)}
            >
              ❤️
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="container mt-4">
      <h2 className="text-danger mb-3">Characters</h2>
      <div className="d-flex flex-row overflow-auto mb-4">
        {renderCards(people, "people")}
      </div>

      <h2 className="text-primary mb-3">Planets</h2>
      <div className="d-flex flex-row overflow-auto mb-4">
        {renderCards(planets, "planets")}
      </div>

      <h2 className="text-success mb-3">Vehicles</h2>
      <div className="d-flex flex-row overflow-auto mb-4">
        {renderCards(vehicles, "vehicles")}
      </div>
    </div>
  );
};

export default Home;
