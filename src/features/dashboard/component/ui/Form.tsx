import { Loader2 } from "lucide-react";
import type { FormEvent, FormHTMLAttributes, ReactNode } from "react";

interface Prop extends FormHTMLAttributes<HTMLFormElement>{
    children:ReactNode;
    buttonText: string;
    submit:(e:FormEvent<HTMLFormElement>)=>void;
    extraFn: ()=>void;
    loading:boolean;
    extraBtnText: string
    extraLoading?:boolean
}
const Form = ({children,buttonText,submit,extraFn,loading,extraBtnText, extraLoading, ...rest}:Prop) => {
    return ( 
        <form 
        {...rest}
        onSubmit={submit}
        className="w-full h-full flex flex-col gap-4 items-start justify-start "
        >
            {children}
            <div className="w-full border-t border-t-slate-400 pt-4 flex items-start justify-end gap-3 ">
                <button 
                onClick={extraFn}
                type="button"
                className="w-full h-12 sm:w-auto text-center font-semibold 
                text-red-500 hover:text-red-700 px-6 py-3 cursor-pointer
                transition-all transform duration-200 text-sm sm:text-base shadow-md rounded-lg capitalize 
                bg-white hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg 
                
                "
                >
                    {extraLoading?(
                        <Loader2 className="w-5 h-5 animate-spin " />
                    ):extraBtnText}
                </button>
                <button 
                type="submit" 
                className="h-12 bg-[#3b82f6]
                capitalize flex items-center justify-center
                w-full sm:w-auto text-center rounded-lg 
                px-6 py-3 text-sm sm:text-base font-semibold text-white 
                shadow-md transition-all transfrom duration-200 hover:-translate-y-0.5 
                hover:shadow-lg hover:bg-[#3b82f6]/90 focus:outline-none focus:ring-2 
                focus:ring-[#3b82f6]/50 focus:ring-offset-2 cursor-pointer
                "
                >
                    {loading?(
                        <Loader2 className="w-5 h-5 animate-spin " />
                    ):buttonText}
                </button>
            </div>
        </form>
     );
}
 
export default Form;