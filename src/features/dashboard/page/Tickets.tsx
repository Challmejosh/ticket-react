import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../component/layout/DashboardLayout";
import { TicketPlus, AlertTriangle } from "lucide-react";
import TicketItem from "../component/ui/TicketItem";
import useTicket from "../hook/useTicket";
import type { TicketType } from "../../../util/types";


const Tickets = () => {
    const { data, isLoading, isError, refetch } = useTicket()
    const [tickets,setTickets] = useState<TicketType[]>([])
    useEffect(()=>{
        if(data){
            setTickets(data.tickets)
        }
    },[data])

    const SkeletonTicketItem = () => (
        <div className="bg-white shadow-md rounded-lg p-4 border border-slate-200 animate-pulse">
            <div className="flex justify-between items-start">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/6"></div>
            </div>
            <div className="mt-4 h-3 bg-gray-200 rounded w-full"></div>
            <div className="mt-1 h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="mt-4 flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
        </div>
    );

    return (
        <DashboardLayout>
            <div className="p-6 w-full">
                <h1 className="text-2xl font-bold mb-6">All Tickets</h1>
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => <SkeletonTicketItem key={i} />)}
                    </div>
                ) : isError ? (
                    <div className="text-center py-10 px-6 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                        <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
                        <h3 className="mt-2 text-sm font-medium text-red-800">Could not fetch tickets</h3>
                        <p className="mt-1 text-sm text-red-600">Something went wrong. Please try again.</p>
                        <div className="mt-6">
                            <button onClick={() => refetch()} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Retry
                            </button>
                        </div>
                    </div>
                ) : tickets.length === 0 ? (
                    <div className="text-center py-10 px-6 border-2 border-dashed border-gray-300 rounded-lg">
                        <TicketPlus className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new ticket.</p>
                        <div className="mt-6">
                            <Link to="/create-ticket" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Create Ticket
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tickets.map((ticket) => (
                            <TicketItem key={ticket._id} ticket={ticket} />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
 
export default Tickets;