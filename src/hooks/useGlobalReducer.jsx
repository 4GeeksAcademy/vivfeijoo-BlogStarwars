import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store.jsx";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useGlobalReducer must be inside StoreProvider");
  return ctx;
}
