import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Navigate } from "react-router-dom";

interface Prop {
    children: React.ReactNode;
}
const AuthVerifiedRoute = ({children}:Prop) => {
    const { user } = useContext(AppContext)

    if(!user){
        // If the user is not authenticated, redirect to the sign-in page.
        return <Navigate to="/signin" replace />
    }
    return <>
    {children}
    </>;
}
 
export default AuthVerifiedRoute;