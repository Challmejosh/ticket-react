import { useState, type FormEvent } from "react";
import Form from "../components/Form";
import Authlayout from "../components/layout/AuthLayout";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import useRegister from "../hook/useRegister";
interface FormType{
    email: string
    password: string
    name: string
    passwordConfirm: string
}
const Signup = () => {
    const { isPending, userRegistration } = useRegister()
    const initialForm:FormType = {
        email: '',
        password: '',
        name: '',
        passwordConfirm: '',
    }
    const [form,setForm] = useState<FormType>(initialForm)
    const [error,setError] = useState<boolean>(false)
    const emailRegex = /\S+@\S+\.\S+/.test(form.email)
    const passwordRegex =/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    const isPasswordValid = passwordRegex.test(form.password);


    const handleSignup = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
            
        if(
            !form.email || 
            !form.password || 
            form.password.length<8||
            !emailRegex||
            form.password.trim()!==form.passwordConfirm.trim()||
            form.email.includes(form.password) ||
            form.name.includes(form.password) ||
            !isPasswordValid
        ){
            setError(true)
            return
        }
        setError(false)
        const userData: Omit<FormType, "passwordConfirm"> = {
            email: form.email.toLowerCase(),
            name: form.name,
            password: form.password,
        } 
        await userRegistration(userData,{
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
            loading={isPending}
            submit={handleSignup}
            header="create an account"
            desc='Get started with TicketFlow in seconds.'
            buttonText="Sign up"
            >
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
                    <Input 
                    id="name"
                    label="full name"
                    type="text"
                    error={error && !form.name}
                    errorMessage="Please enter your name"
                    onChange={(e)=>setForm({...form,name:e.target.value})}
                    placeholder="John Doe"

                    />
                    <Input
                    id="email"
                    label="email address"
                    type="text"
                    placeholder="you@example.com"
                    error={error && (!form.email||!emailRegex)}
                    errorMessage="Please enter a valid email"
                    onChange={(e)=>setForm({...form,email:e.target.value})}

                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
                    <Input 
                    id="password"
                    label="password"
                    type="password"
                    placeholder="Enter your passworn"
                    error={error && (!form.password||form.password.length<8||!isPasswordValid)}
                    onChange={(e)=>setForm({...form,password:e.target.value})}
                    errorMessage={
                        form.password.length<8?
                        "Must be at least 8 characters":
                        (form.email.includes(form.password) || form.name.includes(form.password))?
                        "Password cannot contain name or email" :
                        !isPasswordValid ? 
                        "At least uppercase, number & symbol."
                        :"Please enter a valid password"}
                        
                        />
                    <Input 
                    id="confirm-password"
                    label="confirm password"
                    type="password"
                    placeholder="Confirm your password"
                    error={error && (!form.password||form.passwordConfirm.length<8||form.password.trim()!==form.passwordConfirm.trim()||!isPasswordValid)}
                    errorMessage={
                        form.password.length<8?"Must be at least 8 characters"
                        :form.password.trim()!==form.passwordConfirm.trim()?"Passwords do not match"
                        :(form.email.includes(form.password) || form.name.includes(form.password))?
                        "Password cannot contain name or email" :
                        !isPasswordValid ? 
                        "At least uppercase, number & symbol."
                        :"Please enter a valid password"}
                    onChange={(e)=>setForm({...form,passwordConfirm: e.target.value})}
                    value={form.passwordConfirm}
                    />
                </div>
                
            </Form>
            <p className="">
                Already have an account?
                <Link
                to={'/signin'}
                className=" text-blue-400 font-medium hover:text-blue-500 ml-1 hover:underline transform transition-all duration-300 ease-in-out "
                >
                    Sign in
                </Link>
            </p>
        </Authlayout>
     );
}
 
export default Signup;