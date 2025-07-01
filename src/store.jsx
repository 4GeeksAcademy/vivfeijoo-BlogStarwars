export const initialStore = () => ({
  favorites: []
});

export default function storeReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.favorites.find(f => f.uid === action.payload.uid && f.type === action.payload.type)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          f => !(f.uid === action.payload.uid && f.type === action.payload.type)
        )
      };

    default:
      return state;
  }
}
