import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people")
      .then(res => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then(data => {
        if (data.results) dispatch({ type: "SET_PEOPLE", payload: data.results });
      })
      .catch(err => console.error("Error loading data", err));
  }, [dispatch]);

  if (!store.people) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h1>Star Wars Characters</h1>
      <div className="row">
        {store.people.map(item => (
          <div key={item.uid} className="card m-2" style={{ width: "18rem" }}>
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`}
              className="card-img-top"
              alt={item.name}
              onError={e => (e.target.src = "/fallback.png")}
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <Link to={`/people/${item.uid}`} className="btn btn-primary btn-sm">
                Read More
              </Link>
              <button
                className="btn btn-outline-warning btn-sm ms-2"
                onClick={() => dispatch({ type: "ADD_FAVORITE", payload: item })}
              >
                ❤
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
