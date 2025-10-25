import type { SelectHTMLAttributes } from "react";
import FieldError from "../../../../components/ui/FieldError";
import { AnimatePresence } from "framer-motion";

interface InputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    id: string;
    error?: boolean;
    errorMessage?: string;
    data: string[]
}

const Select = ({ label, id, error, data, errorMessage, ...rest }: InputProps) => {
    return ( 
    <div className="relative w-full transition-all transform duration-300 ease-in-out">
        <label className="text-[#0f172a] capitalize text-base font-medium leading-normal pb-2" htmlFor={id}>
            {label}
        </label>
        <div className="mt-1">
            <select {...rest} name="" id="" className="form-field capitalize cursor-pointer w-full " >
                {data.map((item,index)=>(
                    <option key={index} value={item}>{item?.split("_").join(" ")}</option>
                ))}
            </select>
            <AnimatePresence>
                {error&&(
                    <FieldError msg={errorMessage} />
                )}
            </AnimatePresence>
        </div>
    </div>
     );
}
 
export default Select;