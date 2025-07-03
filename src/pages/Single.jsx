import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Single = () => {
  const { type, uid } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
        const result = await res.json();
        setData(result.result.properties);
      } catch (error) {
        console.error("❌ Error fetching detail:", error);
      }
    };

    fetchDetail();
  }, [type, uid]);

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
        <div className="col-md-6">
          <img
            src={`https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`}
            alt={data.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>{data.name}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            auctor ligula at quam convallis, at laoreet sapien dapibus.
          </p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="row text-center text-danger">
        <div className="col-md-2 fw-bold">Name<br />{data.name}</div>
        <div className="col-md-2 fw-bold">Birth Year<br />{data.birth_year}</div>
        <div className="col-md-2 fw-bold">Gender<br />{data.gender}</div>
        <div className="col-md-2 fw-bold">Height<br />{data.height}</div>
        <div className="col-md-2 fw-bold">Skin Color<br />{data.skin_color}</div>
        <div className="col-md-2 fw-bold">Eye Color<br />{data.eye_color}</div>
      </div>
    </div>
  );
};

export default Single;

