import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Navigate } from "react-router-dom";

interface Prop {
    children: React.ReactNode;
}
const NonVerifiedRoute = ({children}:Prop) => {
    const { user } = useContext(AppContext)

    if(user){
        // If the user is already authenticated, redirect to the dashboard.
        return <Navigate to="/dashboard" replace />
    }
    return <>
    {children}
    </>;
}
 
export default NonVerifiedRoute;