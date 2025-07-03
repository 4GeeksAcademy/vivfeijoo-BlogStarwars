import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CharacterCard = ({ character }) => {
  const { name, uid } = character;

  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`}
        className="card-img-top"
        alt={name}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Some quick info about {name}.</p>
        <Link to={`/people/${uid}`} className="btn btn-outline-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired
  }).isRequired
};

export default CharacterCard;
