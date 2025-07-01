import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Single = () => {
  const { type, uid } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);

        if (!res.ok) {
          throw new Error("Fetch failed");
        }

        const result = await res.json();
        setData(result.result.properties);
        setError(false);
      } catch (err) {
        console.error("Error fetching detail:", err);
        setError(true);
      }
    };

    fetchDetail();
  }, [type, uid]);

  if (error) {
    return (
      <div className="container text-center mt-5 text-danger">
        <p>Error loading data</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container text-center mt-5">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <img
            src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${uid}.jpg`}
            alt={data.name}
            className="img-fluid rounded mb-3"
          />
        </div>
        <div className="col-md-6">
          <h2>{data.name}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
            velit euismod, fermentum nisi at, malesuada arcu.
          </p>
        </div>
      </div>

      <hr />

      <div className="row text-center text-danger mt-4">
        {type === "people" && (
          <>
            <div className="col">
              <strong>Gender:</strong> {data.gender}
            </div>
            <div className="col">
              <strong>Hair Color:</strong> {data.hair_color}
            </div>
            <div className="col">
              <strong>Eye Color:</strong> {data.eye_color}
            </div>
          </>
        )}

        {type === "planets" && (
          <>
            <div className="col">
              <strong>Population:</strong> {data.population}
            </div>
            <div className="col">
              <strong>Climate:</strong> {data.climate}
            </div>
            <div className="col">
              <strong>Terrain:</strong> {data.terrain}
            </div>
            <div className="col">
              <strong>Orbital Period:</strong> {data.orbital_period}
            </div>
            <div className="col">
              <strong>Rotation Period:</strong> {data.rotation_period}
            </div>
            <div className="col">
              <strong>Diameter:</strong> {data.diameter}
            </div>
          </>
        )}

        {type === "vehicles" && (
          <>
            <div className="col">
              <strong>Model:</strong> {data.model}
            </div>
            <div className="col">
              <strong>Vehicle Class:</strong> {data.vehicle_class}
            </div>
            <div className="col">
              <strong>Manufacturer:</strong> {data.manufacturer}
            </div>
            <div className="col">
              <strong>Passengers:</strong> {data.passengers}
            </div>
            <div className="col">
              <strong>Max Speed:</strong> {data.max_atmosphering_speed}
            </div>
            <div className="col">
              <strong>Length:</strong> {data.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Single;


