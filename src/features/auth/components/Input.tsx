import type { InputHTMLAttributes } from "react";
import FieldError from "../../../components/ui/FieldError";
import { AnimatePresence } from "framer-motion";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    error?: boolean;
    errorMessage?: string;
}

const Input = ({ label, id, error, errorMessage, ...rest }: InputProps) => {
    return ( 
    <div className="w-full h-full pb-4 relative transition-all transform duration-300 ease-in-out">
        <label className="block capitalize text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor={id}>
            {label}
        </label>
        <div className="mt-1">
            <input 
                id={id}
                className="block w-full appearance-none rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:text-white" 
                {...rest}
            />
        </div>
        <AnimatePresence>
            {error&&(
                <FieldError msg={errorMessage} />
            )}
        </AnimatePresence>
    </div>
     );
}
 
export default Input;