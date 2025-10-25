import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../api/apiClient";
import useTicket from "./useTicket";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { AppContext } from "../../../Context/AppContext";
import { useContext, useState } from "react";

const delItem = async ({ id, ticketId }: { id: string; ticketId: string }) => {
  const res = await apiClient.delete(`/tickets/${id}`, {
    data: { ticketId }, // 👈 must be nested under "data"
  });
  return res.data;
};


const useDelete = () => {
    const { user } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { refetch } = useTicket()
    const { mutateAsync, isPending} = useMutation({
        mutationFn: ({id,ticketId}:{id:string,ticketId:string}) => delItem({id,ticketId}),
        onSuccess: (data) => {
            console.log(data)
            setIsModalOpen(false)
            refetch()
            toast.success(data.message)
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
    const ticketDelete = (ticketId:string) => {
        setIsModalOpen(true)
        mutateAsync({id:user?.id as string,ticketId})
    }
    const openModal = (isOpen:boolean) => {
        setIsModalOpen(isOpen)
    }
    return {
        ticketDelete,
        isPending,
        isModalOpen,
        openModal,
    };
}
 
export default useDelete;