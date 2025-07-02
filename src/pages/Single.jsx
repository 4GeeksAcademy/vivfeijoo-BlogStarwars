import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Single = () => {
  const { uid } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${uid}`)
      .then(res => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then(data => {
        if (data.result && data.result.properties) {
          setItem(data.result.properties);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(err => {
        console.error("Error loading data:", err);
        setError(true);
      });
  }, [uid]);

  if (error) return <div className="text-danger">Error loading data</div>;
  if (!item) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{item.name}</h2>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`}
            className="img-fluid rounded"
            alt={item.name}
          />
        </div>
        <div className="col-md-6">
          <p><strong>Height:</strong> {item.height}</p>
          <p><strong>Mass:</strong> {item.mass}</p>
          <p><strong>Hair Color:</strong> {item.hair_color}</p>
          <p><strong>Skin Color:</strong> {item.skin_color}</p>
          <p><strong>Eye Color:</strong> {item.eye_color}</p>
          <p><strong>Birth Year:</strong> {item.birth_year}</p>
          <p><strong>Gender:</strong> {item.gender}</p>
        </div>
      </div>
    </div>
  );
};

export default Single;

