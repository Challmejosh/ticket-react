import type { InputHTMLAttributes } from "react";
import FieldError from "../../../../components/ui/FieldError";
import { AnimatePresence } from "framer-motion";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    error?: boolean;
    errorMessage?: string;
}

const Input = ({ label, id, error, errorMessage, ...rest }: InputProps) => {
    return ( 
    <div className={`relative h-[100px] w-full transition-all transform duration-300 ease-in-out`}>
        <label className="text-[#0f172a] capitalize text-base font-medium leading-normal pb-2" htmlFor={id}>
            {label}
        </label>
        <div className="mt-1">
            <input 
                id={id}
                className="form-field" 
                {...rest}
            />
            <AnimatePresence>
                {error&&(
                    <FieldError msg={errorMessage} />
                )}
            </AnimatePresence>
        </div>
    </div>
     );
}
 
export default Input;