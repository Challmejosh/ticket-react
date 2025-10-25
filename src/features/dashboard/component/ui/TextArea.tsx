import type { TextareaHTMLAttributes } from "react";
import FieldError from "../../../../components/ui/FieldError";
import { AnimatePresence } from "framer-motion";

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    id: string;
    error?: boolean;
    errorMessage?: string;
}

const TextArea = ({ label, id, error, errorMessage, ...rest }: InputProps) => {
    return ( 
    <div className={ 
        `
        relative w-full transition-all transform duration-300 ease-in-out
        h-[200px]
        `
     }>
        <label className="text-[#0f172a] capitalize text-base font-medium leading-normal pb-2" htmlFor={id}>
            {label}
        </label>
        <div className="mt-1">
            <textarea 
                id={id}
                className="form-field resize-none h-[150px] " 
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
 
export default TextArea;