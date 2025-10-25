import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import type { TicketType, User } from "../util/types";
import { useNavigate } from "react-router-dom";





interface Prop {
    children:React.ReactNode
}
const AppProvider = ({children}:Prop) => {
    const navigate = useNavigate()
    const [tickets, setTickets] = useState<TicketType[]>([])
    const [user,setUser] = useState<User|null>(null)
    const createTicket = ({title,status,desc,priority}:TicketType) =>{
        const newTicket: TicketType = {
            _id: new Date().getTime().toString(),
            title: title,
            status,
            desc: desc||"",
            priority: priority||"none",
        }
        setTickets((prev)=>[...prev,newTicket])
    }

    const updateTicket = (updatedTicket: TicketType) => {
        setTickets(prev => prev.map(ticket => 
            ticket._id === updatedTicket._id ? updatedTicket : ticket
        ));
    };
    const saveUser = (user:User)=>{
        localStorage.setItem('user',JSON.stringify(user))
        setUser(user)
    }
    const saveTickets = (tickets:TicketType[])=>{
        setTickets(tickets)
    }
    const logOut = ()=>{
        localStorage.removeItem('user')
        setUser(null)
        navigate("/")
    }
    useEffect(()=>{
        const user = localStorage.getItem('user')
        if(user){
            saveUser(JSON.parse(user))
        }
    },[])
    return ( 
        <AppContext.Provider value={{
            tickets,
            createTicket,
            updateTicket,
            user,
            saveUser,
            saveTickets,
            logOut,
        }}>
            {children}
        </AppContext.Provider>
     );
}
 
export default AppProvider;