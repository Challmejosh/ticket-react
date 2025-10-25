import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../api/apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import useTicket from "./useTicket";

export interface CreateTicketType{
    id: string;
    title: string,
    desc: string,
    status: string,
    priority: string,

}
const createTicket = async (ticketInfo: CreateTicketType) => {
    console.log(ticketInfo)
    const { id, title, desc, status, priority} = ticketInfo
    const res = await apiClient.post(`/tickets/${id}`,{
        title,
        desc,
        status,
        priority
    })
    return res.data;
}
const useCreate = () => {
    const { refetch } = useTicket()
    const navigate = useNavigate()
    const { mutateAsync, isPending} = useMutation({
        mutationFn:(ticketInfo: CreateTicketType) => createTicket(ticketInfo),
        onSuccess: (data)=>{
            console.log(data)
            refetch()
            navigate("/tickets")
            toast.success(data.message)
        },
        onError: (err)=>{
            console.log(err)
            if(isAxiosError(err)){
                toast.error(err.response?.data.message)
            }else{
                toast.error("Something went wrong")
            }
        }
    })
    return {
        ticketCreation: mutateAsync,
        isPending,
    };
}
 
export default useCreate;