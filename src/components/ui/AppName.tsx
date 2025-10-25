import { Ticket } from "lucide-react";
import { appName } from "../../util/AppName";

const AppName = () => {
    return ( 
        <div className="text-3xl flex items-center justify-center text-center gap-2 font-bold tracking-tight">
            <Ticket size={35} color="#3b82f6" />
            <p className="">
                {appName}
            </p>
        </div>
     );
}
 
export default AppName;