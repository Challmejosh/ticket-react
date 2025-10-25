import { useContext, useEffect, type ReactNode } from "react";
import Navigation from "./Navigation";
import useTicket from "../../hook/useTicket";
import { AppContext } from "../../../../Context/AppContext";

interface Prop{
    children: ReactNode
}
const DashboardLayout = ({children}:Prop) => {
    const { data } = useTicket()
    const { saveTickets } = useContext(AppContext)
    useEffect(()=>{
        if(data){
            saveTickets(data.tickets)
        }
    },[data,saveTickets])
    return ( 
        <div className="relative h-screen flex flex-col lg:flex-row items-start justify-start ">
            <Navigation />
            <div className="h-full overflow-y-auto w-full flex flex-col items-start justify-start ">
                {children}
            </div>
        </div>
     );
}
 
export default DashboardLayout;