import { useNavigate } from "react-router-dom";
import type { TicketType } from "../../../../util/types";

const TicketItem = ({ ticket }: { ticket: TicketType }) => {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high": return "bg-red-500";
            case "medium": return "bg-yellow-500";
            case "low": return "bg-green-500";
            default: return "bg-gray-400";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "open": return "bg-green-200 text-green-800";
            case "in_progress": return "bg-amber-200 text-amber-800";
            case "closed": return "bg-gray-200 text-gray-800";
            default: return "bg-gray-200 text-gray-800";
        }
    };

    const navigate = useNavigate()

    return (
        <div onClick={()=>navigate(`/tickets/${ticket._id}`)} className="bg-white shadow-md rounded-lg p-4 mb-4 border border-slate-200">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold capitalize text-gray-800">{ticket.title}</h3>
                <span className={`px-2 capitalize py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                    {ticket.status.split('_').join(' ')}
                </span>
            </div>
            <p className="text-gray-600 text-sm mt-2">{ticket.desc}</p>
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`}></span>
                    <span className="text-xs text-gray-500 capitalize">{ticket.priority}</span>
                </div>
                <span className="text-xs text-gray-400">ID: {ticket._id}</span>
            </div>
        </div>
    );
};

export default TicketItem;