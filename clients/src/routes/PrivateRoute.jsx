import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalState } from "../GlobalState";


const PrivateRoute = ({ element: Component, ...rest }) => {
    const state = useContext(GlobalState);
    const [token] = state.token;
 


    return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;