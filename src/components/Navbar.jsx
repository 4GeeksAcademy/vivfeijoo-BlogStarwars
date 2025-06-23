import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const { favorites } = store;

  const removeFavorite = (item) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: item });
  };

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link to="/" className="navbar-brand">StarWars Blog</Link>
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          Read Later ({favorites.length})
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {favorites.length === 0 && <li className="dropdown-item">No items</li>}
          {favorites.map((item, index) => (
            <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
              <Link to={`/${item.type}/${item.uid}`} className="me-2">{item.name}</Link>
              <button className="btn btn-sm btn-danger" onClick={() => removeFavorite(item)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
