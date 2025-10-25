import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../api/apiClient"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";
interface LoginType{
    email: string;
    password: string;
}
const signInUser = async (user: LoginType)=>{
    const res = await apiClient.post('/auth/signin',user);
    return res.data
}

const useLogin = () => {
    const { saveUser } = useContext(AppContext)
    const navigate = useNavigate()
    const { mutateAsync, isPending } = useMutation({
        mutationFn:(user:LoginType)=> signInUser(user),
        onSuccess:(data)=>{
            toast.success(data.message)
            saveUser(data.user)
            navigate('/dashboard')
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
        userLogin:mutateAsync,
        isPending,
    };
}
 
export default useLogin;