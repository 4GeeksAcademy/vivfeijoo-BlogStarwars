import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Home = () => {
  const { dispatch } = useGlobalReducer();
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const fetchData = async (type, setter) => {
    try {
      const res = await fetch(`https://www.swapi.tech/api/${type}`);
      const data = await res.json();
      setter(data.results);
    } catch (err) {
      console.error(`Error fetching ${type}:`, err);
    }
  };

  useEffect(() => {
    fetchData("people", setPeople);
    fetchData("planets", setPlanets);
    fetchData("vehicles", setVehicles);
  }, []);

  const handleAddFavorite = (item, type) => {
    dispatch({ type: "ADD_FAVORITE", payload: { ...item, type } });
  };

  const renderCards = (items, type) => (
    items.map((item, i) => (
      <div className="card m-2" style={{ width: "18rem" }} key={i}>
        <img
          src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${item.uid}.jpg`}
          className="card-img-top"
          alt={item.name}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <div className="d-flex justify-content-between">
            <Link to={`/${type}/${item.uid}`} className="btn btn-outline-primary">
              Learn more
            </Link>
            <button className="btn btn-outline-warning" onClick={() => handleAddFavorite(item, type)}>
              <i className="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    ))
  );

  return (
    <div className="container">
      <h2 className="text-danger mt-4">Characters</h2>
      <div className="d-flex flex-wrap">{renderCards(people, "people")}</div>

      <h2 className="text-danger mt-4">Planets</h2>
      <div className="d-flex flex-wrap">{renderCards(planets, "planets")}</div>

      <h2 className="text-danger mt-4">Vehicles</h2>
      <div className="d-flex flex-wrap">{renderCards(vehicles, "vehicles")}</div>
    </div>
  );
};

export default Home;
