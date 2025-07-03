import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const { store } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-light px-3 d-flex justify-content-between">
      <Link to="/" className="navbar-brand fw-bold">
        Star Wars Blog
      </Link>

      <div className="dropdown">
        <button
          className="btn btn-outline-dark dropdown-toggle"
          type="button"
          id="dropdownFavorites"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites ({store.favorites.length})
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownFavorites">
          {store.favorites.length === 0 ? (
            <li className="dropdown-item text-muted">No favorites yet</li>
          ) : (
            store.favorites.map((fav, i) => (
              <li className="dropdown-item" key={i}>
                {fav.name}
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
