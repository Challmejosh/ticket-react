import { useNavigate } from "react-router-dom";
import type { TicketType } from "../../../../util/types";
import { Trash2 } from "lucide-react";
import useDelete from "../../hook/useDelete";
import ConfirmModal from "./confirmModal";
// import ConfirmModal from "./ConfirmModal";

const TicketItem = ({ ticket }: { ticket: TicketType }) => {
    const { ticketDelete, isPending, isModalOpen,openModal} = useDelete()
    
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

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent navigation when clicking delete
        openModal(true);
    };

    const handleConfirmDelete = () => {
        ticketDelete(ticket._id as string);
    };

    return (
        <div onClick={()=>navigate(`/tickets/${ticket._id}`)} className="bg-white shadow-md rounded-lg p-4 mb-4 border border-slate-200 cursor-pointer group relative">
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
            <button 
                onClick={handleDeleteClick}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-100 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                aria-label="Delete ticket"
            >
                <Trash2 size={16} />
            </button>
            <ConfirmModal
                loading={isPending}
                isOpen={isModalOpen}
                onClose={() => openModal(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Ticket"
                message={`Are you sure you want to delete the ticket "${ticket.title}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default TicketItem;