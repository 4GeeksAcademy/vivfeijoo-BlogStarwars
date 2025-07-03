import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemove = (fav) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: fav });
  };

  return (
    <nav className="navbar navbar-light bg-light px-4 justify-content-between">
      <Link to="/" className="navbar-brand fw-bold">
        Star Wars Blog
      </Link>

      <div className="dropdown">
        <button
          className="btn btn-warning dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites ({store.favorites.length})
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {store.favorites.length === 0 ? (
            <li className="dropdown-item text-muted">No favorites</li>
          ) : (
            store.favorites.map((fav, index) => (
              <li className="dropdown-item d-flex justify-content-between align-items-center" key={index}>
                <Link to={`/${fav.type}/${fav.uid}`} className="text-decoration-none">
                  {fav.name}
                </Link>
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => handleRemove(fav)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
