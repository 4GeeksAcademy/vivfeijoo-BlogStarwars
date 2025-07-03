import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Home = () => {
  const [people, setPeople] = useState([]);
  const { store, dispatch } = useGlobalReducer();

  const fetchPeople = async () => {
    try {
      const res = await fetch("https://www.swapi.tech/api/people");
      const data = await res.json();
      setPeople(data.results);
    } catch (err) {
      console.error("Error loading people:", err);
    }
  };

  const addFavorite = (item) => {
    dispatch({
      type: "ADD_FAVORITE",
      payload: {
        uid: item.uid,
        name: item.name,
        type: "people"
      }
    });
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-warning mb-4">Characters</h2>
      <div className="row">
        {people.map((person) => (
          <div className="col-md-4 mb-4" key={person.uid}>
            <div className="card h-100">
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
                className="card-img-top"
                alt={person.name}
                onError={(e) => {
                  e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{person.name}</h5>
                <div className="mt-auto d-flex justify-content-between">
                  <Link to={`/people/${person.uid}`} className="btn btn-outline-primary">
                    Learn More
                  </Link>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => addFavorite(person)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
