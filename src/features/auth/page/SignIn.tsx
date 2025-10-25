import { useState, type FormEvent } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import Authlayout from "../components/layout/AuthLayout";
import useLogin from "../hook/useLogin";

interface FormType{
    email: string
    password: string
}
const SignIn = () => {
    const { isPending,userLogin } = useLogin()
    const initialForm:FormType = {
        email: '',
        password: ''
    }
    const [form,setForm] = useState<FormType>(initialForm)
    const [error,setError] = useState<boolean>(false)
    const emailRegex = /\S+@\S+\.\S+/.test(form.email)
    const handleLogin = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!form.email || !form.password || form.password.length<8||!emailRegex){
            setError(true)
            return
        }
        const userData: FormType = {
            email: form.email.toLowerCase(),
            password: form.password,
        }
        await userLogin(userData,{
            onSuccess:()=>{
                setForm(initialForm)
            },
            onSettled: ()=>{
                setError(false)
            }
        })
    }
    return ( 
        <Authlayout>
                <Form 
                className="w-full sm:w-[400px] "
                loading={isPending}
                header="welcome back"
                desc='Sign in to continue to your dashboard.'
                buttonText="Sign in"
                submit={handleLogin}
                >
                    <Input 
                    id="email"
                    label="email address"
                    type="text"
                    value={form.email}
                    // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email"
                    onChange={(e)=>setForm({...form,email:e.target.value})}
                    placeholder="you@example.com"
                    error={error && (!form.email||!emailRegex)}
                    errorMessage="Please enter a valid email"
                    />
                    <Input 
                    id="password"
                    label="password"
                    value={form.password}
                    type="password"
                    // minLength={8}
                    onChange={(e)=>setForm({...form,password:e.target.value})}
                    placeholder="*********"
                    error={error && (!form.password||form.password.length<8)}
                    errorMessage={form.password.length<8?"Password must be at least 8 characters":"Please enter a valid password"}
                    />
                    <div className="w-full flex items-center justify-end text-sm">
                    <Link className="font-medium text-primary hover:text-blue-500" to="#">
                        Forgot Password?
                    </Link>
                    </div>
                </Form>
                <p className="">
                    Don't have an account?
                    <Link
                    to={'/signup'}
                    className=" text-blue-400 font-medium hover:text-blue-500 ml-1 hover:underline transform transition-all duration-300 ease-in-out "
                    >
                        Sign up
                    </Link>
                </p>
        </Authlayout>
     );
}
 
export default SignIn;