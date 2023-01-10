import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const PriviteRoute = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    console.log(isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/login"></Navigate>

    }
    return (
        <>
            {props.children}
        </>
    )
}
export default PriviteRoute;