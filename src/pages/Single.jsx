import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Single = () => {
  const { uid } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/people/${uid}`);
        const result = await res.json();
        setData(result.result.properties);
      } catch (error) {
        console.error("Error fetching detail:", error);
      }
    };

    fetchDetail();
  }, [uid]);

  if (!data) {
    return (
      <div className="container text-center mt-5">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`}
            alt={data.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>{data.name}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
            repudiandae nihil facilis, fugiat vero amet eveniet deserunt
            temporibus quasi quae?
          </p>
        </div>
      </div>

      <hr className="my-5" />

      <div className="row text-center">
        <div className="col-2 fw-bold text-danger">Name</div>
        <div className="col-2 fw-bold text-danger">Birth Year</div>
        <div className="col-2 fw-bold text-danger">Gender</div>
        <div className="col-2 fw-bold text-danger">Height</div>
        <div className="col-2 fw-bold text-danger">Skin Color</div>
        <div className="col-2 fw-bold text-danger">Eye Color</div>

        <div className="col-2">{data.name}</div>
        <div className="col-2">{data.birth_year}</div>
        <div className="col-2">{data.gender}</div>
        <div className="col-2">{data.height}</div>
        <div className="col-2">{data.skin_color}</div>
        <div className="col-2">{data.eye_color}</div>
      </div>
    </div>
  );
};

export default Single;

