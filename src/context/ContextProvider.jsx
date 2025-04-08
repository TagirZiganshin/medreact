import { Children, use, useState } from "react";
import { StateContext } from "./StateContext.jsx";
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [role, setRole] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    return (
        <StateContext.Provider
            value={{
                user,
                token,
                role,
                setUser,
                setToken,
                setRole,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};
