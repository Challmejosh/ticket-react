import { motion } from "framer-motion";
interface Prop {
    msg: string|undefined;

}
const FieldError = ({msg}:Prop) => {
    return ( 
        <motion.p 
        initial={{
            y: -10,
            opacity: 0,
            zIndex: 0,
            visibility: "hidden"
        }}
        animate={{
            y: 0,
            opacity: 1,
            zIndex: 1,
            visibility: "visible"
        }}
        exit={{
            // y: 0,
            opacity: 0,
            zIndex: 0,
            visibility: "hidden"
        }}
        transition={{
            duration: 0.6,
            ease: "easeInOut",
        }}
            className="absolute bottom-0 text-xs text-red-400 mt-1 transition-all transform duration-300 ease-in-out ">
                {msg}
        </motion.p>
     );
}
 
export default FieldError;