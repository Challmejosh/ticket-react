import { createContext } from "react"
import type { TicketType, User } from "../util/types"

interface ContextType{
    tickets: TicketType[];
    createTicket: (ticket: TicketType) => void;
    updateTicket: (ticket: TicketType) => void;
    saveTickets: (tickets: TicketType[]) => void;
    user: User|null;
    saveUser: (user: User) => void;
    logOut: () => void;
}
const iniitialState: ContextType ={
    tickets:[],
    createTicket: () => {},
    updateTicket: () => {},
    user: null,
    saveUser: () => {},
    saveTickets: () => {},
    logOut: () => {}
}

export const AppContext = createContext<ContextType>(iniitialState)