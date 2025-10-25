import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../api/apiClient";
import useTicket from "./useTicket";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export interface UpdateTicketType {
  ticketId: string;   // unique identifier for the ticket
  title: string;      // title of the ticket
  desc: string;       // description of the ticket
  status: string;     // status (e.g., "open", "closed", etc.)
  priority: string;   // priority level (0, 1, 2, etc.)
  userId: string
}
const updateTicket = async (ticketInfo: UpdateTicketType) => {
    const res = await apiClient.put(`/tickets/${ticketInfo.ticketId}`,{
        title: ticketInfo.title,
        desc: ticketInfo.desc,
        status: ticketInfo.status,
        priority: ticketInfo.priority,
        ticketId: ticketInfo.ticketId,
    })
    return res.data
}

const useUpdate = () => {
    const { refetch } = useTicket()
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (ticketInfo: UpdateTicketType) => updateTicket(ticketInfo),
        onSuccess: (data) => {
            console.log(data)
            refetch()
        },
        onError: (err) => {
            console.log(err)
            if(isAxiosError(err)){
                toast.error(err.response?.data.message)
            }else{
                toast.error("Something went wrong")
            }
        },

    })
    return {
        ticketUpdate: mutateAsync,
        isPending,
    };
}
 
export default useUpdate;