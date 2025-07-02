export function initialStore() {
  return {
    people: [],
    favorites: []
  };
}

export default function storeReducer(state, action) {
  switch (action.type) {
    case "SET_PEOPLE":
      return { ...state, people: action.payload };
    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] };
    default:
      return state;
  }
}
