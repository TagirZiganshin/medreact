import { Outlet, Link, Navigate } from "react-router-dom";
import { useStateContext } from "../context/StateContext.jsx";
const GuestLayout = () => {
    const { user, token, role } = useStateContext();
    if (token) {
        return <Navigate to="/home" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default GuestLayout;
