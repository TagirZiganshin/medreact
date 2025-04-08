import { useContext, createContext } from "react";
export const StateContext = createContext({
    user: null,
    token: null,
    role: null,
    setUser: () => {},
    setToken: () => {},
    setRole: () => {},
});

export const useStateContext = () => useContext(StateContext);
