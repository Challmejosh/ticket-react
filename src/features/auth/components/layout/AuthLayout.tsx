import type { ReactNode } from "react";
import AuthAppName from "../../../../components/ui/AppName";
import BgSvg from "../../../../components/ui/BackgroundSvg";

interface Prop{
    children: ReactNode
}
const Authlayout = ({children}:Prop) => {
    return ( 
        <div className=" bg-[#f8fafc] h-screen p-3 flex flex-col gap-6 items-center justify-center w-full">
            <BgSvg />
            <div className="z-10 w-full flex flex-col gap-6 items-center justify-center">
            <AuthAppName />
            {children}
            </div>
        </div>
     );
}
 
export default Authlayout;