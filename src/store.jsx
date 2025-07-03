export const initialStore = () => ({
  favorites: [],
});

export default function storeReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (
        state.favorites.find(
          (fav) => fav.uid === action.payload.uid && fav.type === action.payload.type
        )
      ) {
        return state; // ya existe
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
        ),
      };

    default:
      return state;
  }
}
