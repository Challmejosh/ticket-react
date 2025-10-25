import { useContext, useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";
import type { TicketType } from "../../../util/types";
import DashboardLayout from "../component/layout/DashboardLayout";
import Form from "../component/ui/Form";
import Input from "../component/ui/Input";
import Select from "../component/ui/Select";
import TextArea from "../component/ui/TextArea";
import { ArrowLeft, Edit, Loader2 } from "lucide-react";
import useUpdate, { type UpdateTicketType } from "../hook/useUpdate";

const ViewAndEditTicket = () => {
    const { id } = useParams()
    const { ticketUpdate, isPending} = useUpdate()
    const { user, tickets } = useContext(AppContext)
    const [ticket,setTicket] = useState<TicketType|null>(null)
    const [form, setForm] = useState<TicketType | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!id){
            navigate('/tickets')
        }else{
            const findTicket = tickets?.find(item=>item._id===id)
            if(findTicket){
                setTicket(findTicket)
                setForm(findTicket)
            } else if (tickets.length > 0) {
                // If tickets are loaded but this one isn't found, redirect.
                navigate('/tickets');
            }
        }
    },[id,navigate,tickets])

    const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!form || !form.title || !form.status || (form.desc.trim() && form.desc.length < 10) || form.title.length <= 5) {
            setError(true)
            return
        }
        setError(false)
        const updateData: UpdateTicketType = {
            ticketId: form._id as string ,
            title: form.title,
            desc: form.desc,
            status: form.status,
            priority: form.priority,
            userId: user?.id as string,
        }
        ticketUpdate(updateData,{
            onSuccess:(data)=>{
                setIsEditing(false)
                setForm(data.ticket)
                setTicket(data.ticket)
            },
            onSettled:()=>{
                setError(false)
            }
        })
    }

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

    if (!ticket || !form) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center w-full h-full">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            </DashboardLayout>
        )
    }

    return ( 
        <DashboardLayout>
            <div className="p-6 w-full max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => navigate('/tickets')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                        <ArrowLeft size={16} /> Back to Tickets
                    </button>
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                            <Edit size={16} /> Edit
                        </button>
                    )}
                </div>

                {isEditing ? (
                     <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                        <h1 className="text-2xl font-bold mb-6">Edit Ticket</h1>
                        <Form
                            loading={isPending}
                            submit={handleUpdate}
                            buttonText="Save Changes"
                            extraBtnText="Cancel"
                            extraFn={() => { setIsEditing(false); setForm(ticket); }}
                        >
                            <Input
                                id="title"
                                label="Title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                error={error && (!form.title || form.title.length <= 5)}
                                errorMessage={!form.title ? "Title is required" : "Title must be greater than 5 characters"}
                            />
                            <TextArea
                                id="desc"
                                label="Description"
                                value={form.desc}
                                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                                error={error && !!(form.desc.trim() && form.desc.length < 10)}
                                errorMessage="Description must be at least 10 characters"
                            />
                            <div className="flex gap-4 items-center justify-between w-full">
                                <Select
                                    value={form.status}
                                    data={["open", "in_progress", "closed"]}
                                    label="Status"
                                    onChange={(e) => setForm({ ...form, status: e.target.value as "open" | "closed" | "in_progress" })}
                                    id="status"
                                    error={error && !form.status}
                                    errorMessage="Status is required"
                                />
                                <Select
                                    value={form.priority}
                                    data={["none", "low", "medium", "high"]}
                                    label="Priority"
                                    onChange={(e) => setForm({ ...form, priority: e.target.value as "low" | "medium" | "high" | "none" })}
                                    id="priority"
                                />
                            </div>
                        </Form>
                     </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-200">
                            <h1 className="text-2xl font-bold text-gray-900">{ticket.title}</h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="md:col-span-2 p-6">
                                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h2>
                                <p className="text-gray-700 whitespace-pre-wrap">{ticket.desc || <span className="italic text-gray-400">No description provided.</span>}</p>
                            </div>
                            <div className="md:col-span-1 bg-slate-50 p-6 border-t md:border-t-0 md:border-l border-slate-200">
                                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Details</h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Status</p>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(ticket.status)}`}>
                                            {ticket.status.split('_').join(' ')}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Priority</p>
                                        <div className="flex items-center gap-2">
                                            <span className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`}></span>
                                            <span className="text-sm text-gray-800 capitalize">{ticket.priority}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Ticket ID</p>
                                        <p className="text-sm text-gray-800 font-mono">{ticket._id}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
     );
}
 
export default ViewAndEditTicket;