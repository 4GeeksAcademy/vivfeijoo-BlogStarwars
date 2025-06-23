import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Single = () => {
  const { type, uid } = useParams();
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();

        if (!data.result || !data.result.properties) {
          throw new Error("No properties found");
        }

        setProperties(data.result.properties);
        setLoading(false);
      } catch (error) {
        console.error("Error loading detail:", error.message);
        setProperties(null);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [type, uid]);

  const getImage = () => {
    const category = type === "people" ? "characters" : type;
    return `https://starwars-visualguide.com/assets/img/${category}/${uid}.jpg`;
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!properties) {
    return <div className="text-center mt-5">No data available.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "700px" }}>
        <img
          src={getImage()}
          className="card-img-top"
          alt={properties.name}
          onError={(e) =>
            (e.target.src =
              "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")
          }
        />
        <div className="card-body">
          <h3 className="card-title">{properties.name}</h3>
          <ul className="list-group list-group-flush mt-3">
            {Object.entries(properties).map(([key, value]) => (
              <li className="list-group-item" key={key}>
                <strong>{key.replaceAll("_", " ")}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Single;
