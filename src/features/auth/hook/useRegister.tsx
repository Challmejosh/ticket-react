import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../api/apiClient"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
interface RegisterType{
    name: string;
    email: string;
    password: string;
}
const registerUser = async (user: RegisterType)=>{
    const res = await apiClient.post('/auth/register',user)
    return res.data
}

const useRegister = () => {
    const navigate = useNavigate();
    const { mutateAsync, isPending } = useMutation({
        mutationFn:(user:RegisterType)=> registerUser(user),
        onSuccess:(data)=>{
            toast.success(data.message)
            navigate('/signin')
        },
        onError:(err)=>{
            console.log(err)
            if(isAxiosError(err)){
                toast.error(err.response?.data.message)
            }else{
                toast.error('Something went wrong')
            }
        }
    })

    return {
        userRegistration:mutateAsync,
        isPending,
    };
}
 
export default useRegister;