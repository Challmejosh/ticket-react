import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../../api/apiClient"
import { useContext } from "react"
import { AppContext } from "../../../Context/AppContext"

const getTicket = async (id:string)=>{
    const res = await apiClient.get(`/tickets/${id}`)
    return res.data
}

const useTicket = () => {
  const { user } = useContext(AppContext);

  return useQuery({
    queryKey: ["ticket", user?.id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey; // second item in queryKey is the user id
      return getTicket(id as string);
    },
    enabled: !!user?.id, // only run if user.id exists
    staleTime: 1000, 
  });
};
 
export default useTicket;