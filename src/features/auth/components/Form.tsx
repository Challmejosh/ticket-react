import { Loader2 } from "lucide-react";
import type { FormEvent, FormHTMLAttributes, ReactNode } from "react";

interface Prop extends FormHTMLAttributes<HTMLFormElement> {
    header: string;
    desc: string;
    buttonText: string;
    children: ReactNode;
    submit: (e:FormEvent<HTMLFormElement>)=>void
    loading: boolean
}

const Form = ({header, desc, buttonText, children,submit,loading, ...rest}:Prop) => {
    return (
        <form
        onSubmit={submit}
        {...rest}
        className="flex flex-col gap-6 items-center justify-center shadow-lg rounded-lg bg-white dark:bg-slate-900/70 dark:backdrop-blur-sm p-8 shadow-soft border border-slate-200 dark:border-slate-800 ">
            <div className="flex flex-col gap-2 items-center justify-center text-center">
                <h2 
                className="text-2xl capitalize font-bold text-text-light dark:text-text-dark">
                    {header}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    {desc}
                </p>
            </div>
            <div className="flex flex-col gap-2 items-start justify-center w-full transition-all transform duration-300 ease-in-out ">
                {children}
            </div>
            <button 
            type="submit"
            className="
            flex w-full min-w-[84px] max-w-[480px] cursor-pointer
            items-center justify-center overflow-hidden rounded-lg
            h-11 px-6 bg-[#3b82f6] text-white text-sm font-bold
            shadow-md hover:shadow-lg transition-all duration-200 
            ease-in-out transform hover:-translate-y-0.5 focus:outline-none
             focus:ring-2 focus:ring-offset-2 focus:ring-primary 
             dark:focus:ring-offset-background-dark"
            >
                {loading?(
                    <Loader2 className="h-5 w-5 animate-spin" />
                ):(
                    buttonText
                )}
            </button>
        </form>
     );
}
 
export default Form;